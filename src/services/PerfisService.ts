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
		localStorage.removeItem("perfil");

		const response = await http.post("/perfis/login", { email, senha });

		localStorage.setItem("token", response.data.token);
    localStorage.setItem("perfil", JSON.stringify(response.data.perfil));

		return response.data;
	}

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("perfil");
  }

	async cadastrar({ nome, email, senha, tipoPerfil }: CadastroData) {
    localStorage.removeItem("token");
		localStorage.removeItem("perfil");

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
