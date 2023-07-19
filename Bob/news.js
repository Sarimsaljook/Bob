const url =
  "https://newsapi.org/v2/everything?q=finance&apiKey=815d99b6443d4fa18eb6bb69715d0c7c";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}