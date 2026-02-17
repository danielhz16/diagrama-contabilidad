import { useCallback } from 'react';
import pptxgen from 'pptxgenjs';
import { accountingPrinciples } from '../data/accountingData';
import logoUmg from '../assets/umg.png';

export const usePowerPoint = () => {
    const exportToPPTX = useCallback(async () => {
        const pres = new pptxgen();

        const titleSlide = pres.addSlide();
        titleSlide.background = { color: '0f172a' };

        titleSlide.addText('UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA\nCAMPUS HUEHUETENANGO \nINGENIERIA EN SISTEMAS DE LA INFORMACIÓN Y CIENCIAS DE LA COMPUTACIÓN', {
            x: 0, y: 0.8, w: 10, h: 0.8,
            fontSize: 14, color: 'e2e8f0', align: 'center'
        });



        titleSlide.addImage({
            path: logoUmg,
            x: 4.125, y: 1.8, w: 1.75, h: 1.75,
            sizing: { type: 'contain', w: 1.75, h: 1.75 }
        });

        titleSlide.addText('PRINCIPIOS DE CGA', {
            x: 0, y: 3.7, w: 10, h: 0.8,
            fontSize: 36, bold: true, color: 'ffffff', align: 'center'
        });

        titleSlide.addText('JOSUÉ DANIEL HERNÁNDEZ GÓMEZ - 0904 26 10239\nSECCION A - CONTABILIDAD\nLIC. Dany Miranda Hernández', {
            x: 0, y: 4.7, w: 10, h: 0.8,
            fontSize: 14, color: 'cbd5e1', align: 'center'
        });

        accountingPrinciples.forEach((principle) => {
            const slide = pres.addSlide();
            slide.background = { color: '0f172a' };

            slide.addText(principle.title, {
                x: 0.5, y: 0.5, w: 9, h: 0.8,
                fontSize: 28, bold: true, color: principle.color.slice(1, 7), align: 'left'
            });

            slide.addShape(pres.ShapeType.rect, {
                x: 0.5, y: 1.4, w: 5.2, h: 3.6,
                fill: { color: '1e293b' },
                line: { color: principle.color.slice(1, 7), width: 1 }
            });

            slide.addText(principle.content, {
                x: 0.7, y: 1.6, w: 4.8, h: 3.2,
                fontSize: 18, color: 'ffffff', align: 'left', valign: 'top'
            });

            if (principle.image) {
                slide.addImage({
                    path: principle.image,
                    x: 6.35, y: 1.8, w: 2, h: 2,
                    sizing: { type: 'contain', w: 2, h: 2 }
                });
            }

            slide.addText('CGA - Contabilidad - UMG', {
                x: 0.5, y: 5.2, w: 9, h: 0.3,
                fontSize: 10, color: 'cbd5e1', align: 'right'
            });
        });

        const filename = `${new Date().toDateString()}-${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

        await pres.writeFile({ fileName: `Principios_CGA_${filename}.pptx` });
    }, []);

    return { exportToPPTX };
};
