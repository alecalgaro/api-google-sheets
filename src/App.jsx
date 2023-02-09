import { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import "./App.css";

function App() {
	const [products, setProducts] = useState([]);

	const API_GOOGLE_SHEETS =
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vQRMhbwxsY1gncMQlaeRuO6WEe9HL51SJOzULDHiRQmROzykZesGp_X5VK8icDzphU2vCA2kopXQZNl/pub?output=csv";

	const getProducts = async () => {
		axios
			.get(API_GOOGLE_SHEETS, {
				responseType: "blob", // se le debe indicar que es de tipo blob
			})
			.then((response) => {
				// uso el constructor de promesas para crear una, porque el metodo de papa.parse no funciona con promise, asi creamos una promesa a nuestro gusto
				return new Promise((resolve, reject) => {
					// a papaparse le pasamos response.data que es la info recibida en csv
					Papa.parse(response.data, {
						header: true, // le indica a papaparse que el primer elemento del array son los headers (titulos) de la tabla, con eso nos va a armar el json poniendo esos valores como claves
						complete: (results) => {
							// "complete" es una funcion que en "results.data" tiene los resultados de parsear el objeto
							//console.log(results.data);
							setProducts(results.data);
							return resolve(results.data); // resolve del promise
						},
						error: (error) => {
							return reject(error.message); // reject del promise si hay un error
						},
					});
				});
			});
	};

	useEffect(() => {
		getProducts();
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
