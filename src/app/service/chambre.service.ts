import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chambre } from '../Model/Chambre';
import { Reservation } from '../Model/Reservation';
import { HttpClient } from '@angular/common/http';
import { ChambreTypeStatistics } from '../Model/chambre-type-statistics';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {


  private chambreBaseUrl = 'http://localhost:8081/chambre';
  private reservationBaseUrl = 'http://localhost:8081/reservation';

  constructor(private httpClient: HttpClient) {}

  getChambreList(): Observable<Chambre[]> {
    return this.httpClient.get<Chambre[]>(`${this.chambreBaseUrl}/findAll`);
  }

  createChambre(chambre: Chambre): Observable<Chambre> {
    return this.httpClient.post<Chambre>(`${this.chambreBaseUrl}/ajouter`, chambre);
  }

  deleteChambre(chambre: Chambre): Observable<void> {
    const url = `${this.chambreBaseUrl}/delete/${chambre.idChambre}`;
    return this.httpClient.delete<void>(url);
  }

  getReservationsByChambre(idChambre: number): Observable<Reservation[]> {
    const url = `${this.reservationBaseUrl}/reservations/${idChambre}`;
    return this.httpClient.get<Reservation[]>(url);
  }
  updateChambre(chambre: Chambre): Observable<Chambre> {
    const url = `${this.chambreBaseUrl}/update`;
    return this.httpClient.put<Chambre>(url, chambre);
  }
  getChambreById(id: number): Observable<Chambre> {
    const url = `${this.chambreBaseUrl}/${id}`;
    return this.httpClient.get<Chambre>(url);
  }
  searchChambres(numeroChambre?: number, typeC?: string): Observable<Chambre[]> {
    const params: { [key: string]: any } = {};
    if (numeroChambre) {
      params['numeroChambre'] = numeroChambre;
    }
    if (typeC) {
      params['typeC'] = typeC;
    }

    const url = `${this.chambreBaseUrl}/search`;
    return this.httpClient.get<Chambre[]>(url, { params });
  }

  getChambreTypeStatistics(): Observable<ChambreTypeStatistics[]> {
    return this.httpClient.get<ChambreTypeStatistics[]>(`${this.chambreBaseUrl}/types`);
  }

  deleteChambreByid(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.chambreBaseUrl}/delete/${id}`);
  }
}


