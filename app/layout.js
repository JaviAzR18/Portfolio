import '../style.css';

export const metadata = {
  title: 'Javier Aznar Ruiz — Data Analyst & ML Engineer',
  description: 'Javier Aznar Ruiz — Data Analyst & ML Engineer. Portfolio showcasing data science projects, machine learning models, and professional experience.',
  keywords: 'Data Analyst, ML Engineer, Python, Machine Learning, BigQuery, PySpark, Portfolio',
  authors: [{ name: 'Javier Aznar Ruiz' }],
  openGraph: {
    title: 'Javier Aznar Ruiz — Data Analyst & ML Engineer',
    description: 'Portfolio of Javier Aznar Ruiz, Data Analyst & ML Engineer based in Valencia, Spain.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
