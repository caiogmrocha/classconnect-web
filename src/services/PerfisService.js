import { http } from "@/lib/http";

class PerfisService {
	async login({ email, senha }) {
		const response = await http.post("/perfis/login", { email, senha });

		localStorage.setItem("token", response.data.token);

		return response.data;
	}

	async cadastrar({ nome, email, senha, tipoPerfil }) {
		const response = await http.post("/perfis/cadastrar", {
			nome,
			email,
			senha,
			tipoPerfil
		});

		return response.data;
	}
}

export const perfisService = new PerfisService();
