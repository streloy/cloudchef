import React, { useState } from "react";
import axios from "axios";
import { Tree } from "react-tree-graph";

// eslint-disable-next-line import/no-anonymous-default-export
export default function Content() {
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState<any>({});

  const uploadJson = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3001/api/v1/upload/", formData)
      .then((res: any) => {
        dataVizualization(res.data);
      })
      .catch((err: any) => alert(err));
    };

  function dataVizualization(data: any) {
    if (data.success === 0) {
      alert(data.message);
      setData([]);
      setGraph({});
    } else {
      axios.get("http://localhost:3001/api/v1/upload/").then((res: any) => {
        setData(res.data.data.data);
        setGraph(res.data.data.graph[0]);
      }).catch((err: any) => alert(err));
    }
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <h3 className="mb-0">File Upload</h3>
        </div>
        <div className="card-body d-flex gap-3 flex-wrap">
          <div className="mb-3 flex-fill">
            <input
              className="form-control"
              type="file"
              value=""
              onChange={(e) => {
                if (e.target.files != null) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={uploadJson}>
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
          <h3 className="mb-0">Tree View</h3>
        </div>
        <div className="card-body text-center">  
            {data.length > 0 &&
              <div>
                <Tree
                    data={graph}
                    height={600}
                    width={800}
                />
              </div>
            }
        </div>
      </div>
      
    </>
  );
}
