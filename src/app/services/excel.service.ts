import { Injectable } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';
@Injectable({ providedIn: 'root' })
export class ExcelService {
  downloadExcel(workbook: Workbook, filename: string) {
    workbook!.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, filename);
    });
  }
  addHtmlTableToExcelWithOriginalDatatype(
    table: HTMLTableElement,
    workbook: Workbook,
    startAddress: any = { sheetNoOrName: 0, r: 1, c: 1 },
  ) {
    let worksheet = workbook.getWorksheet(startAddress.sheetNoOrName);
    if (!worksheet) {
      worksheet = workbook.addWorksheet(
        typeof startAddress.sheetNoOrName == 'number' ? undefined : startAddress.sheetNoOrName,
      );
    }

    const trList = table.querySelectorAll('tr');
    let totalTableColumn = 0;
    const colWidths: { [col: number]: number } = {};

    trList?.forEach((tr, rowIndex) => {
      const tdList = tr.querySelectorAll('th, td');
      const row = worksheet!.getRow(rowIndex + startAddress.r);
      let maxCellLines = 1;

      let cellIndex = startAddress.c;
      let totalColumn = 0;

      for (let dataIndex = 0; dataIndex < tdList.length; dataIndex++) {
        const td = tdList[dataIndex];

        // Skip merge-slave cells only (not the master itself)
        while (true) {
          const probeCell = row.getCell(cellIndex);
          if (probeCell.isMerged && probeCell.address !== probeCell.master?.address) {
            cellIndex++;
          } else {
            break;
          }
        }

        // ---- Extract cell text while converting <br>, <p>, <div> to explicit newlines ----
        let innerText = '';
        if (td.children && td.children.length > 0) {
          const lines: string[] = [];
          const childNodes = Array.from(td.childNodes);
          let currentLine = '';

          const extractNode = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              currentLine += node.textContent || '';
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              const tag = el.tagName.toUpperCase();
              if (tag === 'BR') {
                lines.push(currentLine.trim());
                currentLine = '';
              } else if (tag === 'P' || tag === 'DIV') {
                if (currentLine.trim()) {
                  lines.push(currentLine.trim());
                  currentLine = '';
                }
                const pText = (el.innerText || el.textContent || '').trim();
                if (pText) {
                  lines.push(pText);
                }
              } else {
                for (let i = 0; i < el.childNodes.length; i++) {
                  extractNode(el.childNodes[i]);
                }
              }
            }
          };

          childNodes.forEach(extractNode);
          if (currentLine.trim()) {
            lines.push(currentLine.trim());
          }
          innerText = lines.filter((l) => l.length > 0).join('\n');
        } else {
          innerText = (td.textContent || '').trim();
        }

        // Datatype detection for single line values
        let val: any = innerText;
        let numFmt: string | undefined = undefined;

        if (innerText !== '' && !innerText.includes('\n')) {
          if (innerText.toLowerCase() === 'true') {
            val = true;
          } else if (innerText.toLowerCase() === 'false') {
            val = false;
          } else {
            let clean = innerText.replace(/,/g, '').replace(/\s+/g, '');
            let isNegative = false;
            if (clean.startsWith('(') && clean.endsWith(')')) {
              isNegative = true;
              clean = clean.substring(1, clean.length - 1);
            }
            if (clean.startsWith('-')) {
              isNegative = true;
              clean = clean.substring(1);
            } else if (clean.startsWith('+')) {
              clean = clean.substring(1);
            }

            let isCurrency = false;
            if (clean.startsWith('$')) {
              isCurrency = true;
              clean = clean.substring(1);
            }

            let isPercent = false;
            if (clean.endsWith('%')) {
              isPercent = true;
              clean = clean.slice(0, -1);
            }

            const numberPattern = /^(?:\d+(?:\.\d*)?|\.\d+)$/;
            if (numberPattern.test(clean)) {
              const hasLeadingZero =
                clean.length > 1 && clean.startsWith('0') && !clean.startsWith('0.');
              if (!hasLeadingZero) {
                let num = parseFloat(clean);
                if (!isNaN(num)) {
                  if (isNegative) {
                    num = -num;
                  }
                  if (isPercent) {
                    val = num / 100;
                  } else {
                    val = num;
                  }

                  const parts = clean.split('.');
                  const decimals = parts.length > 1 ? parts[1].length : 0;
                  if (isPercent) {
                    numFmt = decimals > 0 ? `0.${'0'.repeat(decimals)}%` : '0%';
                  } else if (isCurrency) {
                    numFmt = decimals > 0 ? `$#,##0.${'0'.repeat(decimals)}` : '$#,##0';
                  } else {
                    const hasCommas = innerText.includes(',');
                    if (hasCommas || decimals > 0) {
                      numFmt = decimals > 0 ? `#,##0.${'0'.repeat(decimals)}` : '#,##0';
                    }
                  }
                }
              }
            } else {
              const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
              if (isoDatePattern.test(innerText)) {
                const date = new Date(innerText);
                if (!isNaN(date.getTime())) {
                  val = date;
                }
              }
            }
          }
        }

        const colspan = parseInt(td.getAttribute('colspan') || '1');
        const rowspan = parseInt(td.getAttribute('rowspan') || '1');
        const isHeader = td.tagName === 'TH';

        const cellFont = {
          name: 'Khmer OS Battambang',
          size: isHeader ? 11 : 10,
          bold: isHeader,
        };
        const isNumberVal = typeof val === 'number';
        const cellAlignment: any = isHeader
          ? { vertical: 'middle', horizontal: 'center', wrapText: true }
          : colspan > 1
            ? { vertical: 'middle', horizontal: 'center', wrapText: true }
            : isNumberVal
              ? { vertical: 'middle', horizontal: 'left', wrapText: true }
              : { vertical: 'middle', horizontal: 'left', wrapText: true };

        const cellBorder: any = {
          top: { style: 'thin', color: { argb: '#000814' } },
          left: { style: 'thin', color: { argb: '#000814' } },
          bottom: {
            style: 'thin',
            color: { argb: '#000814' },
          },
          right: { style: 'thin', color: { argb: '#000814' } },
        };
        const startR = row.number;
        const startC = cellIndex;

        if (colspan > 1 || rowspan > 1) {
          const endR = startR + rowspan - 1;
          const endC = startC + colspan - 1;

          for (let r = startR; r <= endR; r++) {
            const currentRow = worksheet!.getRow(r);
            for (let c = startC; c <= endC; c++) {
              const rangeCell = currentRow.getCell(c);
              rangeCell.style = JSON.parse(JSON.stringify(rangeCell.style || {}));
              rangeCell.font = cellFont;
              rangeCell.alignment = cellAlignment;
              rangeCell.border = cellBorder;
              // rangeCell.fill = cellFill;
            }
          }

          worksheet!.mergeCells(startR, startC, endR, endC);
          totalColumn += colspan - 1;
        } else {
          const cell = row.getCell(cellIndex);
          cell.style = JSON.parse(JSON.stringify(cell.style || {}));
          cell.font = cellFont;
          cell.alignment = cellAlignment;
          cell.border = cellBorder;
          // cell.fill = cellFill;
        }

        // Write value/numFmt to the true top-left cell of the range
        const masterCell = worksheet!.getCell(startR, startC);
        masterCell.value = val;
        if (numFmt) {
          masterCell.numFmt = numFmt;
        }

        // Calculate content width and track max text length per column
        if (innerText) {
          const lines = innerText.split('\n');
          let maxLineLen = 0;
          for (const line of lines) {
            const lineLen = line.trim().length;
            if (lineLen > maxLineLen) {
              maxLineLen = lineLen;
            }
          }

          if (colspan === 1) {
            colWidths[startC] = Math.max(colWidths[startC] || 0, maxLineLen);
          } else if (colspan <= 3) {
            const perColLen = Math.ceil(maxLineLen / colspan);
            for (let c = startC; c < startC + colspan; c++) {
              colWidths[c] = Math.max(colWidths[c] || 0, perColLen);
            }
          }
        }

        cellIndex += colspan;
        totalColumn++;
      }

      if (totalColumn > totalTableColumn) {
        totalTableColumn = totalColumn;
      }
    });

    // 1. Apply auto-fit width to each column with comfortable padding
    for (let c = startAddress.c; c < startAddress.c + totalTableColumn; c++) {
      const maxLen = colWidths[c] || 0;
      const minColWidth = c === 1 ? 8 : 14;
      const width = Math.min(Math.max(minColWidth, maxLen + 4), 50);
      worksheet!.getColumn(c).width = width;
    }

    // 2. Adjust row height accurately and uniformly
    trList?.forEach((tr, rowIndex) => {
      const tdList = tr.querySelectorAll('th, td');
      const row = worksheet!.getRow(rowIndex + startAddress.r);
      const isHeaderRow = tr.querySelector('th') !== null;
      let maxCellLines = 1;

      let cellIndex = startAddress.c;
      for (let dataIndex = 0; dataIndex < tdList.length; dataIndex++) {
        const td = tdList[dataIndex];

        while (true) {
          const probeCell = row.getCell(cellIndex);
          if (probeCell.isMerged && probeCell.address !== probeCell.master?.address) {
            cellIndex++;
          } else {
            break;
          }
        }

        const colspan = parseInt(td.getAttribute('colspan') || '1');
        const rowspan = parseInt(td.getAttribute('rowspan') || '1');
        const text = (td.textContent || '').trim();

        if (text) {
          let effectiveColWidth = 0;
          for (let c = cellIndex; c < cellIndex + colspan; c++) {
            effectiveColWidth += worksheet!.getColumn(c).width || 10;
          }

          const charsFactor = td.tagName === 'TH' ? 0.75 : 0.95;
          const charsPerLine = Math.max(Math.floor(effectiveColWidth * charsFactor), 4);
          const rawLines = text.split(/\r\n|\r|\n/);
          let cellLines = 0;

          for (const line of rawLines) {
            const trimmed = line.trim();
            if (!trimmed) {
              cellLines += 1;
            } else {
              cellLines += Math.max(1, Math.ceil(trimmed.length / charsPerLine));
            }
          }

          const linesForThisRow = Math.ceil(cellLines / rowspan);
          if (linesForThisRow > maxCellLines) {
            maxCellLines = linesForThisRow;
          }
        }

        cellIndex += colspan;
      }

      if (isHeaderRow) {
        row.height = maxCellLines > 1 ? maxCellLines * 22 + 14 : 32;
      } else {
        row.height = maxCellLines > 1 ? maxCellLines * 18 + 10 : 26;
      }
    });

    return workbook;
  }

  exportHtmlTableToExcel(
    table: HTMLTableElement,
    title?: string,
    subTitle?: string,
  ): Promise<Workbook> {
    return new Promise<Workbook>((resolve, reject) => {
      try {
        const workbook = new Workbook();
        const startR = title || subTitle ? 4 : 1;
        const startAddress: any = {
          sheetNoOrName: 'Sheet1',
          r: startR,
          c: 1,
        };

        let worksheet = workbook.getWorksheet(startAddress.sheetNoOrName);
        if (!worksheet) {
          worksheet = workbook.addWorksheet(
            typeof startAddress.sheetNoOrName === 'number'
              ? `Sheet${startAddress.sheetNoOrName}`
              : startAddress.sheetNoOrName,
            {
              views: [{ showGridLines: true, zoomScale: 100 }],
            },
          );
        }

        // Add table data and styles
        this.addHtmlTableToExcelWithOriginalDatatype(table, workbook, startAddress);

        // Compute total column count from the table
        const firstRow = table.querySelector('tr');
        const colCount = firstRow ? firstRow.querySelectorAll('th, td').length : 8;
        const lastCol = Math.max(colCount, 1);

        // Header Title Banner
        if (title) {
          const titleRow = worksheet.getRow(1);
          titleRow.height = 36;
          worksheet.mergeCells(1, 1, 1, lastCol);
          const titleCell = worksheet.getCell(1, 1);
          titleCell.value = title.toUpperCase();
          titleCell.font = {
            name: 'Khmer OS Battambang',
            size: 16,
            bold: true,
          };
          titleCell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
        }

        // Subtitle / Generated Date banner
        if (subTitle) {
          const subTitleRow = worksheet.getRow(2);
          subTitleRow.height = 22;
          worksheet.mergeCells(2, 1, 2, lastCol);
          const subTitleCell = worksheet.getCell(2, 1);
          subTitleCell.value = subTitle;
          subTitleCell.font = {
            name: 'Khmer OS Battambang',
            size: 11,
          };
          subTitleCell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
        }

        // Page setup for printing / PDF export
        const orientation = worksheet.actualColumnCount > 8 ? 'landscape' : 'portrait';
        worksheet.pageSetup = {
          ...worksheet.pageSetup,
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
          horizontalCentered: true,
          verticalCentered: false,
          orientation,
          margins: {
            left: 0.5,
            right: 0.5,
            top: 0.75,
            bottom: 0.75,
            header: 0.3,
            footer: 0.3,
          },
        };

        resolve(workbook);
      } catch (error) {
        reject(error);
      }
    });
  }
}
