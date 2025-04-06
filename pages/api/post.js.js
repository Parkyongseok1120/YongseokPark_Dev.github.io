export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { title, content, section } = req.body;
    if (!title || !content || !section) {
      return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
    
    // 파일 이름과 경로 생성 (예: blog/2025-04-06-제목.md)
    const date = new Date().toISOString().slice(0,10);
    const fileName = `${date}-${title.replace(/\s+/g, '-')}.md`;
    const filePath = `${section}/${fileName}`;
    
    // 저장할 파일 내용 (YAML frontmatter 포함 가능)
    const fileContent = `---
  title: "${title}"
  date: "${date}"
  section: "${section}"
  ---
  
  ${content}
  `;
  
    // GitHub API를 호출하기 위한 설정
    const owner = 'Parkyongseok1120';
    const repo = 'YOUR_REPO_NAME'; // 실제 저장소 이름 입력
    const branch = 'main';
    const githubToken = process.env.GITHUB_TOKEN; // 저장소에 쓰기 권한이 있는 토큰
    
    // 먼저 해당 파일이 이미 존재하는지 확인하는 로직 (생략 가능)
    
    // GitHub API를 사용해 새 파일 생성 (PUT 요청)
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const payload = {
      message: `새 게시글 추가: ${title}`,
      content: Buffer.from(fileContent).toString('base64'),
      branch,
    };
  
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (response.ok) {
      res.status(200).json({ message: '게시글 저장 성공' });
    } else {
      const errorData = await response.json();
      res.status(500).json({ message: '저장 실패', error: errorData });
    }
  }
  