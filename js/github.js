const API_ROOT = "https://api.github.com";

export async function getRepositoryMetadata(owner, repo){
  try{
    const response = await fetch(`${API_ROOT}/repos/${owner}/${repo}`, {
      headers: { "Accept": "application/vnd.github+json" }
    });

    if(!response.ok) return null;

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      language: data.language,
      updatedAt: data.updated_at,
      homepage: data.homepage || null
    };
  }catch(error){
    console.warn(`GitHub API no disponible para ${owner}/${repo}`, error);
    return null;
  }
}
