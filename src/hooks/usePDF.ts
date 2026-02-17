import { useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { accountingPrinciples } from '../data/accountingData';
import logoUmg from '../assets/umg.png';

export const usePDF = () => {
    const exportToPDF = useCallback(async () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'a4'
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.setFillColor(15, 23, 42);
        pdf.rect(0, 0, width, height, 'F');

        pdf.setTextColor(226, 232, 240);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'normal');
        pdf.text('UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA\nCAMPUS HUEHUETENANGO\nINGENIERIA EN SISTEMAS DE LA INFORMACIÓN Y CIENCIAS DE LA COMPUTACIÓN', width / 2, 80, { align: 'center' });

        try {
            const logoSize = 140;
            pdf.addImage(logoUmg, 'PNG', width / 2 - logoSize / 2, 130, logoSize, logoSize);
        } catch (e) {
            console.error('Error adding logo to PDF cover:', e);
        }

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(36);
        pdf.setFont('helvetica', 'bold');
        pdf.text('PRINCIPIOS DE CGA', width / 2, 330, { align: 'center' });

        pdf.setTextColor(203, 213, 225);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'normal');
        pdf.text('JOSUÉ DANIEL HERNÁNDEZ GÓMEZ - 0904 26 10239\nSECCION A - CONTABILIDAD\nLIC. Dany Miranda Hernández', width / 2, 400, { align: 'center' });

        accountingPrinciples.forEach((principle) => {
            pdf.addPage();

            pdf.setFillColor(15, 23, 42);
            pdf.rect(0, 0, width, height, 'F');

            const color = principle.color.replace('#', '');
            const r = parseInt(color.substring(0, 2), 16);
            const g = parseInt(color.substring(2, 4), 16);
            const b = parseInt(color.substring(4, 6), 16);

            pdf.setTextColor(r, g, b);
            pdf.setFontSize(28);
            pdf.setFont('helvetica', 'bold');
            pdf.text(principle.title, 40, 50);

            pdf.setFillColor(30, 41, 59);
            pdf.setDrawColor(r, g, b);
            pdf.rect(40, 80, 420, height - 160, 'F');
            pdf.rect(40, 80, 420, height - 160, 'D');

            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'normal');
            const splitText = pdf.splitTextToSize(principle.content, 380);
            pdf.text(splitText, 60, 130);

            if (principle?.image) {
                const size = 140;
                const xCenter = 480 + (width - 480 - 40) / 2 - size / 2;
                const yCenter = 80 + (height - 160) / 2 - size / 2;

              
                const format = principle.image.includes('png') ? 'PNG' : 'JPEG';
                pdf.addImage(principle.image, format, xCenter, yCenter, size, size);
            }

            pdf.setTextColor(160, 175, 190);
            pdf.setFontSize(10);
            pdf.text('CGA - Contabilidad - UMG', width - 40, height - 30, { align: 'right' });
        });

        const date = new Date().toDateString();
        const namefile = `${date}-${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        pdf.save(`Principios_CGA_${namefile}.pdf`);
    }, []);

    return { exportToPDF };
};
