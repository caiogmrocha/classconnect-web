import { http } from "@/lib/http";

type LoginData = {
	email: string;
	senha: string;
};

type CadastroData = {
	nome: string;
	email: string;
	senha: string;
	tipoPerfil: string;
};

class PerfisService {
	async login({ email, senha }: LoginData) {
		localStorage.removeItem("token");

		const response = await http.post("/perfis/login", { email, senha });

		localStorage.setItem("token", response.data.token);

		return response.data;
	}

	async cadastrar({ nome, email, senha, tipoPerfil }: CadastroData) {
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
