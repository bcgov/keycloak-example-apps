import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from '@button-inc/bcgov-theme/Button';

export default function Logoutwarningmodal({remainingSeconds, onExtendSession}) {

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Your Session Will Expire in {remainingSeconds} Seconds.</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Would you like to extend your session?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onExtendSession}>Extend Session</Button>
        <form action="/logout" method="post">
          <Button variant="primary">Logout</Button>
        </form>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
