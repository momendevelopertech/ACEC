"use client";

import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1 className="font-heading">Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <div className="not-found-actions">
          <Link href="/" className="magnetic-btn magnetic-btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
