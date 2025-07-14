import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Страница не найдена</h1>
      <p>Перейдите на главную страницу:</p>
      <Link href="/music/main" style={{ color: 'black', textDecoration: 'underline' }}>
        На главную
      </Link>
    </div>
    )
}