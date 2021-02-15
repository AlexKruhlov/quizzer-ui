import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../question/question';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  findAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:8081/question', httpOptions);
  }

  saveQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>('http://localhost:8081/question', question, httpOptions);
  }
}
