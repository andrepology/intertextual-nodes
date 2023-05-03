import React, { useEffect, useRef } from 'react';
import { Template } from '@pdfme/generator';
//import Pdf from './anotate.pdf';

export default function PDFDisplay () {
	
}
/*
export default function PDFDisplay () {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		let PSPDFKit;

		(async function () {
			PSPDFKit = await import('pspdfkit');

			if (PSPDFKit) {
				PSPDFKit.unload(container);
			}

			await PSPDFKit.load({
				container,
				document: '/document.pdf',
				baseUrl: `${window.location.protocol}//${window.location.host}/`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, []);

	return <div ref={containerRef} style={{ height: '100vh' }} />;
}*/