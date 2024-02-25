import { http } from "@/lib/http";

class PerfisService {
	async login({ email, senha }) {
		const response = await http.post("/perfis/login", { email, senha });

		localStorage.setItem("token", response.data.token);

		return response.data;
	}
}

export const perfisService = new PerfisService();
