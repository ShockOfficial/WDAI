const btn = document.querySelector('#btn');
const img = document.querySelector('#img');
const imagesSrc = [
	{ src: './img/1.jpeg', style: 'border: 2px dashed red' },
	{ src: './img/2.jpeg', style: 'border: 2px dashed royalblue' },
	{ src: './img/3.jpeg', style: 'border: 2px dashed yellowgreen' },
];
let currentImageIndex = 0;

btn.addEventListener('click', (e) => {
	const { src, style } = imagesSrc[++currentImageIndex % imagesSrc.length];
	img.setAttribute('src', src);
	img.style = style;
});

