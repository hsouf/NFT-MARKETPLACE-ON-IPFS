import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import config from "../config.js";

const IPFS = require("ipfs-api");

const ipfs = new IPFS({
  host: config.ipfs_gateway.host,
  port: config.ipfs_gateway.port,
  protocol: config.ipfs_gateway.protocol,
});

const FileUpload = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [disabled, setEnabled] = useState(false);
  const [receipt, setReceipt] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setEnabled(true);
    setMessage(
      "We are uploading your file to IPFS please wait for your Token ID"
    );
    try {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        let buffer = Buffer(reader.result);

        await ipfs.files.add(buffer, (error, ipfsHash) => {
          setMessage(" Token ID : " + ipfsHash[0].hash);

          props.contract.methods
            .mint(props.account, ipfsHash[0].hash)
            .send({ from: props.account, handleRevert: true })
            .on("transactionHash", function(hash) {
              console.log(hash);
              setReceipt("TXN Hash: " + hash);
              console.log("prop" + props.contract.options);
            })
            .on("error", function(error, receipt) {
              alert(
                "Sorry something went wrong,  the ERC721 token already exists"
              );
            });
          setFileHash(ipfsHash[0].hash);
          setEnabled(false); // make upload available again
        });
      };

      //sending the buffer+ path to ipfs (remote node)
    } catch (err) {
      setMessage("sorry couldn't upload the file for you ");
      console.log(err);
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
          disabled={disabled}
        />
      </form>
      {receipt.toString() ? <Message msg={JSON.stringify(receipt)} /> : null}
    </Fragment>
  );
};

export default FileUpload;
