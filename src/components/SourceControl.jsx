import React, { useState, useEffect } from "react";
import './SourceControl.css'

const SourceControl = () => {
    const [files, setFiles] = useState([]);
    const [pull, setPull] = useState("Pull");
    const [push, setPush] = useState("Push");
    const [filesCheck, setFilesCheck] = useState([]);

    const handlePull = async () => {
        const execData = {
            feature: "PULL",
            params: [],
            project: "useless"
        };

        try {
            setPull("Loading...");
            setFiles([]);
            setFilesCheck([]);
            const response = await fetch('http://localhost:8080/api/execFeature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(execData),
            });
            if (response.ok) {
                const data = await response.json();
                setFiles(prevFiles => {
                    const merge = [...prevFiles, ...data.modified, ...data.untracked];
                    return merge;
                });
            } else {
                const errorData = await response.json();
                setFiles(["Error"]);
            }
        } catch (error) {
            console.error('Error:', error);
            setFiles(["Error"]);
        }
        setPull("Pull")
    };

    const handlePush = async () => {

        var execData = {
            feature: "ADD",
            params: filesCheck,
            project: "useless"
        };

        try {
            setPush("Loading...");
            setFiles([]);
            const response = await fetch('http://localhost:8080/api/execFeature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(execData),
            });
            if (response.ok) {
                const data = await response.json();
                setFiles(prevFiles => {
                    const merge = [...prevFiles, ...data.modified, ...data.untracked];
                    return merge;
                });
            } else {
                const errorData = await response.json();
                setFiles(["Error"]);
            }
        } catch (error) {
            console.error('Error:', error);
            setFiles(["Error"]);
        }

        execData = {
            feature: "COMMIT",
            params: ["test commit with front"],
            project: "useless"
        };

        try {
            setFiles([]);
            const response = await fetch('http://localhost:8080/api/execFeature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(execData),
            });
            if (response.ok) {
            } else {
                const errorData = await response.json();
                setFiles(["Error"]);
            }
        } catch (error) {
            console.error('Error:', error);
            setFiles(["Error"]);
        }

        setPush("Push")
        setFilesCheck([]);
    };

    const handleCheck = (e) => {
        const file = e.target.attributes.path.nodeValue;
        if (filesCheck.includes(file)) {
            setFilesCheck(filesCheck.filter(e => e != file));
        }
        else {
            setFilesCheck(
                prev => {
                    const merge = [...prev, file];
                    return merge;
                }
            );
        }
    };

    return (
        <div className="MainDiv">
            <p style={{
                color: "white",
                margin: "0",
                padding: "10px",
                paddingLeft: "20px",
                fontSize: "11px"
            }}>
                SOURCE CONTROL
            </p>
            <div className="divlistGit">
                <ul className="Ullist">
                    {files.map((file, index) => (
                        <li className="filelist" key={index}><input path={file} type="checkbox" onClick={handleCheck}></input><p className="file">{file.split('/').pop()}</p><p className="path">{file}</p><p></p></li>
                    ))}
                </ul>
            </div>
            <div className={"source-control"}>
                <button className="button" onClick={handlePull}>{pull}</button>
                <button className="button" onClick={handlePush}>{push}</button>
            </div>
        </div >
    );
};

export default SourceControl;