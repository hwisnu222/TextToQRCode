import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import QRcode from "qrcode.react";
import domImage from "dom-to-image";
import FileSaver from "file-saver";
import { CompactPicker } from "react-color";

export default function Home() {
  const [qr, setQr] = useState({
    text: "hello",
    file: "",
    checkbox: "false",
  });
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [colorPreview, setColorPreview] = useState(false);
  const [errorFile, setErrorFile] = useState(false);

  const { text, file, checkbox } = qr;

  const _closeModal = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setQr({
      ...qr,
      [e.target.name]:
        e.target.name === "checkbox" ? e.target.checked : e.target.value,
    });
    setErrorFile(false);
  };

  const downloadQrcode = () => {
    if (!file) return setErrorFile(true);

    const canvas = document.getElementById("canvas");

    domImage.toBlob(canvas).then(function (blob) {
      FileSaver.saveAs(blob, `${file}.png`);
    });

    setModal(!modal);
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="p-4 main">
          <div className="wrapper shadow-smooth py-5 px-4 text-white mb-4">
            <h3>Generate</h3>
            <p>and tell to the world</p>
          </div>
          <div>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className="font-weight-bold">
                <h4>Text</h4>
              </Form.Label>
              <Form.Control
                type="text"
                name="text"
                placeholder="Enter your text"
                className="bg-transparent border border-top-0 border-bottom-5 border-right-0 border-left-0 shadow-none"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <Form.Text className="text-muted">
                QR Code will generate automaticaly
              </Form.Text>
            </Form.Group>
          </div>
        </Col>
        <Col md={4} className="p-4 side">
          <div className="shadow-smooth bg-white rounded-3 side-child d-flex justify-content-start align-items-center flex-column">
            <h4 className="mb-3 font-weight-bold">QR Code</h4>
            <div
              className="p-3 mb-5"
              id="canvas"
              style={
                checkbox
                  ? { borderRadius: "1em", backgroundColor: color }
                  : { borderRadius: 0, backgroundColor: color }
              }
            >
              <QRcode value={text} size={200} bgColor={color} />
              <h5 className="font-weight-bold mt-2 text-center mb-0">
                Scan Me
              </h5>
            </div>

            <div className="d-flex align-items-start justify-content-between w-100 border border-2 py-3 px-2 mb-3 rounded">
              <span className="font-weight-bold mr-auto">Background</span>
              {colorPreview && (
                <div className="color-picker">
                  <CompactPicker
                    onChangeComplete={(e) => {
                      setColor(e.hex);
                      setColorPreview(!colorPreview);
                    }}
                  />
                </div>
              )}
              <div className="color-pick rounded">
                <div
                  className="color-result mr-auto"
                  style={{ background: color }}
                  onClick={() => {
                    setColorPreview(!colorPreview);
                  }}
                ></div>
              </div>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="checkbox"
                  hidden
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Form.Group>
            </div>

            <div className="d-flex align-items-start justify-content-between w-100 border border-2 py-3 px-2 mb-5 rounded">
              <span className="font-weight-bold mr-auto">Rounded</span>
              <label
                for="formBasicCheckbox"
                className="custom-checkbox mb-0"
                style={
                  checkbox
                    ? { background: "#ef7115" }
                    : { background: "#ffffff" }
                }
              ></label>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="checkbox"
                  hidden
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Form.Group>
            </div>
            <Button
              variant="warning"
              className="w-100 font-weight-bold shadow-none btn-orange text-white"
              onClick={_closeModal}
            >
              Download
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        show={modal}
        onHide={_closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-wrapper"
      >
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title id="contained-modal-title-vcenter">
            Download QR code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="font-weight-bold">
              <h6>File name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="file"
              placeholder="Enter file name"
              className="border border-top-0 border-bottom-5 border-right-0 border-left-0 shadow-none"
              onChange={(e) => {
                onChange(e);
              }}
            />
            {errorFile && (
              <Form.Text className="text-danger text-italic">
                Please enter file name first
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button onClick={_closeModal} variant="link" className="text-danger">
            Cancel
          </Button>
          <Button
            onClick={downloadQrcode}
            variant="success"
            className="shadow-none"
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
