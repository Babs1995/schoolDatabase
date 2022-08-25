import React from "react";
// page that renders during authorized action
export default function Forbidden() {
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </main>
  );
}
