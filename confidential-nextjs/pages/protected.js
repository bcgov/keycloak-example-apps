import React from "react";
import Button from 'react-bootstrap/Button';

export default function Protected() {
  return (
    <div>
      <h1>Protected Route</h1>
      <form action="/logout" method="POST">
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}

