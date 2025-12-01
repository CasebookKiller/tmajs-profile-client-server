export class CountryService {
  getCountries() {
    return fetch('countries.json')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(d => d.data);
  }
}