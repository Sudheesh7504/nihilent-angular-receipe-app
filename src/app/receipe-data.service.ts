import { Injectable } from '@angular/core';
import { Receipe } from './app.component';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

const API = 'https://64f6f41a9d7754084952d870.mockapi.io/receipes';

@Injectable({
  providedIn: 'root'
})
export class ReceipeDataService {
  receipes: Array<Receipe> = [];

  constructor(private http: HttpClient) { }

  getReceipeListFromMockAPI() {
    return this.http.get<Receipe[]>(API);
  }

  getReceipeById(id: string) {
    return this.http.get<Receipe>(`${API}/${id}`);
  }

  deleteReceipesById(id: string) {
    return this.http.delete<Receipe>(`${API}/${id}`);
  }

  createMovie(newReceipe: Receipe) {
    return this.http.post(`${API}`, newReceipe);
  }

  updateReceipeById(updatedReceipe: Receipe) {
    const id = updatedReceipe.id;
    return this.http.put(`${API}/${id}`, updatedReceipe);
  }


  searchReceipeList(receipeName: string) {
    return this.http.get<Receipe[]>(`${API}?receipeName=${receipeName}`);
  }

  setReceipeList(newReceipe: Receipe) {
    this.receipes.push(newReceipe);
  }
  //encapsulation
  getReceipes() {
    return this.receipes;
  }

  getReceipeListPagination(
    page: number,
    limit: number,
    search: string = '',
    sortBy: string = '',
    order = ''
  ) {
    let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('search', search)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<Receipe[]>(API, { params });
  }


  // getReceipePagination(page: number, limit: number, searchTerm?: string) {
  //   let url = `${API}?limit=${limit}&page=${page}`;
  //   if (searchTerm) {
  //     url += `&search=${searchTerm}`;
  //   }

  //   return this.http.get<Receipe[]>(url);
  // }
  setReceipes(newReceipe: Receipe) {
    this.receipes.push(newReceipe);

  }

  updateReceipe(updatedReceipe: Receipe) {
    console.log(this.receipes);
    const id = updatedReceipe.id;
    const index = this.receipes.findIndex((rc) => rc.id === id);
    this.receipes.splice(index, 1, updatedReceipe);
    // this.movieList.push(newMovie);
  }


}

