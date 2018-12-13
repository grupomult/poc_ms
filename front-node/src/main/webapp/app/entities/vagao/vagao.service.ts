import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVagao } from 'app/shared/model/vagao.model';

type EntityResponseType = HttpResponse<IVagao>;
type EntityArrayResponseType = HttpResponse<IVagao[]>;

@Injectable({ providedIn: 'root' })
export class VagaoService {
    public resourceUrl = SERVER_API_URL + 'api/vagaos';

    constructor(private http: HttpClient) {}

    create(vagao: IVagao): Observable<EntityResponseType> {
        return this.http.post<IVagao>(this.resourceUrl, vagao, { observe: 'response' });
    }

    update(vagao: IVagao): Observable<EntityResponseType> {
        return this.http.put<IVagao>(this.resourceUrl, vagao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVagao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVagao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
