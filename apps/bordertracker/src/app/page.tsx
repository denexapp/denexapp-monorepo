import { Button, CiriUi } from '@denexapp/ciri-ui';
import { actionsRow, mainContent, pageContainer } from './page.css';

export default function HomePage() {
  return (
    <div className={pageContainer}>
      <main className={mainContent}>
        <CiriUi
          title="BorderTracker"
          description="Next.js 16 application initialized in the monorepo and styled with @denexapp/ciri-ui and Vanilla Extract."
          elevation="surface0"
        >
          <div className={actionsRow}>
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Documentation</Button>
          </div>
        </CiriUi>
      </main>
    </div>
  );
}
