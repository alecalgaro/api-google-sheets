import { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import "./App.css";

function App() {
	const [products, setProducts] = useState([]);

	const API_GOOGLE_SHEETS =
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vQRMhbwxsY1gncMQlaeRuO6WEe9HL51SJOzULDHiRQmROzykZesGp_X5VK8icDzphU2vCA2kopXQZNl/pub?output=csv";

	// CONSULTA CON ASYNC-AWAIT Y FETCH
	async function getData() {
		const res = await fetch(API_GOOGLE_SHEETS);
		const data = await res.text(); // lo obtenemos como texto plano en lugar de json
		// usamos la libreria papaparse para convertir de csv a json
		// uso el constructor de promesas para crear una, porque el metodo de papa.parse no funciona con promise, asi creamos una promesa a nuestro gusto
		const dataParsed = await new Promise((resolve, reject) => {
			// a papaparse le pasamos los datos recibidos que queremos pasar de csv a json
			Papa.parse(data, {
				header: true, // le indica a papaparse que el primer elemento del array son los headers (titulos) de la tabla, con eso nos va a armar el json poniendo esos valores como claves
				// "complete" es una funcion que en "results.data" tiene los resultados de parsear el objeto
				complete: (results) => {
					resolve(results.data); // resolve del promise (el valor que devuelve si todo sale bien)
					//si quisiera podria usar results.data aca, pero mejor hacerlo aparte:
					//console.log(results.data);
					//setProducts(results.data);
				},
				error: (error) => {
					return reject(error.message); // reject del promise si hay un error
				},
			});
		});
		setProducts(dataParsed); // podria usarlo aca pero mejor aparte
		return dataParsed;
	}

	// CONSULTA CON AXIOS
	// const getData = async () => {
	// 	axios
	// 		.get(API_GOOGLE_SHEETS, {
	// 			responseType: "blob", // se le debe indicar que es de tipo blob
	// 		})
	// 		.then((response) => {
	// 			return new Promise((resolve, reject) => {
	// 				Papa.parse(response.data, {
	// 					header: true, // le indica a papaparse que el primer elemento del array son los headers (titulos) de la tabla, con eso nos va a armar el json poniendo esos valores como claves
	// 					complete: (results) => {
	// 						setProducts(results.data);	// lo hice aca dentro pero en la de fetch lo hice afuera usando la funcion getProducts
	// 						return resolve(results.data); // resolve del promise
	// 					},
	// 					error: (error) => {
	// 						return reject(error.message); // reject del promise si hay un error
	// 					},
	// 				});
	// 			});
	// 		});
	// };

	const getProducts = async () => {
		const dataProducts = await getData();
		setProducts(dataProducts);
	};

	useEffect(() => {
		// getData();	// si haria el setState dentro de la funcion (como hice con axios para probar)
		getProducts(); // si uso una funcion aparte para el setState
	}, []);

	return (
		<>
			<h2>Productos</h2>
			{products &&
				products.map((product) => {
					//console.log(product);
					//console.log(product.Nombre);
					return (
						<ul key={product.ID}>
							<li>{product.Nombre}</li>
							<p>{product.Precio}</p>
						</ul>
					);
				})}
		</>
	);
}

export default App;
