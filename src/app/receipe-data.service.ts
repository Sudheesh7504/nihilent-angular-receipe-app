import { Injectable } from '@angular/core';
import { Receipe } from './app.component';
import { HttpClient } from '@angular/common/http';
const API = 'https://64f6f41a9d7754084952d870.mockapi.io/receipes';

@Injectable({
  providedIn: 'root'
})
export class ReceipeDataService {
  receipes: Array<Receipe> = [];

  constructor(private http: HttpClient) { }

  getReceipeListFromMockAPI() {
    return this.http.get<Receipe[]>(
      'https://64f6f41a9d7754084952d870.mockapi.io/receipes'
    );
  }

  getReceipeById(id: string) {
    return this.http.get<Receipe>(
      `https://64f6f41a9d7754084952d870.mockapi.io/receipes/${id}`
    );
  }

  deleteReceipesById(id: string) {
    return this.http.delete<Receipe>(
      `https://64f6f41a9d7754084952d870.mockapi.io/receipes/${id}`
    );
  }

  createMovie(newReceipe: Receipe) {
    return this.http.post(
      `https://64f6f41a9d7754084952d870.mockapi.io/receipes`,
      newReceipe
    );
  }

  updateReceipe(updatedReceipe: Receipe, id: string) {
    return this.http.put(
      `${API}/${id}`,
      updatedReceipe

    );
  }


  searchReceipeList(receipeName: string) {
    return this.http.get<Receipe[]>(
      `https://64f6f41a9d7754084952d870.mockapi.io/receipes?search=${receipeName}`,
    );
  }

  setReceipeList(newReceipe: Receipe) {
    this.receipes.push(newReceipe);
  }
  //encapsulation
  getReceipes() {
    return this.receipes;
  }


  getReceipeListPagination(page: number, limit: number, searchTerm?: string) {
    let url = `${API}?limit=${limit}&page=${page}`;
    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }

    return this.http.get<Receipe[]>(url);
  }
  setReceipes(newReceipe: Receipe) {
    this.receipes.push(newReceipe);

  }


}

