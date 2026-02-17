import img1 from '../assets/imgs/entidad.jpg';
import img2 from '../assets/imgs/negocio-marcha.png';
import img3 from '../assets/imgs/moneda-unica.jpeg';
import img4 from '../assets/imgs/conservatismo.jpg';
import img5 from '../assets/imgs/sustancia-antes.png';
import img6 from '../assets/imgs/concietencia.png';
import img7 from '../assets/imgs/realizacion.png';
import img8 from '../assets/imgs/perido-contable.png';
import img9 from '../assets/imgs/relatividad-suficiente.png';
import img10 from '../assets/imgs/importancia-relativa.jpg';
import img11 from '../assets/imgs/main.jpg';
import img12 from '../assets/imgs/uniformidad.png';
import img13 from '../assets/imgs/costo.png';

export interface AccountingPrinciple {
    id: string;
    title: string;
    content: string;
    color: string;
    image?: any;
    connectTo?: string[];
}

export const accountingPrinciples: AccountingPrinciple[] = [
    {
        id: 'main',
        title: 'PRINCIPIOS DE CGA',
        content: 'Son el conjunto de reglas generales y normas que sirven de guía contable para formular criterios referidos a la medición del patrimonio y a la información de los elementos económicos de una entidad.',
        color: '#c8da27',
        image: img11,
        connectTo: ['1']
    },
    {
        id: '1',
        title: 'Entidad',
        content: 'La empresa es una entidad distinta a sus dueños y accionistas; sus bienes y deudas no deben mezclarse.',
        color: '#3b82f6',
        image: img1,
        connectTo: ['2']
    },
    {
        id: '2',
        title: 'Negocio en Marcha',
        content: 'La entidad funcionará mientras no se demuestre lo contrario.',
        color: '#8b5cf6',
        image: img2,
        connectTo: ['3']
    },
    {
        id: '3',
        title: 'Unidad Monetaria',
        content: 'Debe expresarse en la moneda del país donde opera la empresa.',
        color: '#ec4899',
        image: img3,
        connectTo: ['6']
    },
    {
        id: '6',
        title: 'Costo Histórico Original',
        content: 'Las transacciones se registran al costo original de adquisición.',
        color: '#f97316',
        image: img13,
        connectTo: ['5']
    },
    {
        id: '5',
        title: 'Sustancia Antes de Forma',
        content: 'Se debe reflejar la realidad económica antes que la forma legal.',
        color: '#ef4444',
        image: img5,
        connectTo: ['7']
    },
    {
        id: '7',
        title: 'Realización',
        content: 'Los resultados se reconocen cuando la operación está terminada.',
        color: '#f59e0b',
        image: img7,
        connectTo: ['8']
    },
    {
        id: '8',
        title: 'Periodo Contable',
        content: 'La vida de la empresa se divide en periodos para medir resultados.',
        color: '#10b981',
        image: img8,
        connectTo: ['11']
    },
    {
        id: '11',
        title: 'Consistencia y Uniformidad',
        content: 'El proceso contable debe mantenerse constante en el tiempo.',
        color: '#6366f1',
        image: img6,
        connectTo: ['12']
    },
    {
        id: '12',
        title: 'Uniformidad',
        content: 'Los criterios contables deben mantenerse para poder comparar.',
        color: '#a855f7',
        image: img12,
        connectTo: ['10']
    },
    {
        id: '10',
        title: 'Importancia Relativa',
        content: 'Solo la información significativa debe destacarse.',
        color: '#0ea5e9',
        image: img10,
        connectTo: ['9']
    },
    {
        id: '9',
        title: 'Relatividad Suficiente',
        content: 'Los estados financieros deben reflejar la realidad económica.',
        color: '#06b6d4',
        image: img9,
        connectTo: ['4']
    },
    {
        id: '4',
        title: 'Conservatismo',
        content: 'Ante la duda, reconocer pérdidas antes que ganancias.',
        color: '#f43f5e',
        image: img4
    }
];
