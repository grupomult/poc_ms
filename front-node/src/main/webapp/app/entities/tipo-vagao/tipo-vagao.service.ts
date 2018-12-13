import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';

type EntityResponseType = HttpResponse<ITipoVagao>;
type EntityArrayResponseType = HttpResponse<ITipoVagao[]>;

@Injectable({ providedIn: 'root' })
export class TipoVagaoService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-vagaos';

    constructor(private http: HttpClient) {}

    create(tipoVagao: ITipoVagao): Observable<EntityResponseType> {
        return this.http.post<ITipoVagao>(this.resourceUrl, tipoVagao, { observe: 'response' });
    }

    update(tipoVagao: ITipoVagao): Observable<EntityResponseType> {
        return this.http.put<ITipoVagao>(this.resourceUrl, tipoVagao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoVagao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoVagao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
