export class Router {
	routes = {};
	homePage = document.getElementById("home");
	universePage = document.getElementById("universe");
	explorationPage = document.getElementById("exploration");

	constructor() {
		window.route = (event) => this.route(event);

		this.homePage.addEventListener("click", (event) => {
			event.currentTarget.classList.add("active");
			this.universePage.classList.remove("active");
			this.explorationPage.classList.remove("active");
		});

		this.universePage.addEventListener("click", (event) => {
			event.currentTarget.classList.add("active");
			this.homePage.classList.remove("active");
			this.explorationPage.classList.remove("active");
		});

		this.explorationPage.addEventListener("click", (event) => {
			event.currentTarget.classList.add("active");
			this.homePage.classList.remove("active");
			this.universePage.classList.remove("active");
		});
	}

	add(routeName, page) {
		this.routes[routeName] = page;
	}

	route(event) {
		event.preventDefault();
		window.history.pushState({}, "", event.target.href);
		this.handle();
	}

	handle() {
		const { pathname } = window.location;
		const route = this.routes[pathname] || this.routes["/404"];

		fetch(route)
			.then((response) => {
				return response.text();
			})
			.then((html) => {
				document.querySelector("#app").innerHTML = html;
			});
	}
}
