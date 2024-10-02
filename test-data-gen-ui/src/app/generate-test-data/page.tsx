"use client";

import { Textarea, Button, Snippet, Input } from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import { MdFileUpload } from "react-icons/md";

export default function GenerateTestData() {
  const [file, setFile] = useState<any>();
  const [fileContents, setFileContents] = useState<string>("");
  const [isReadingFile, setIsReadingFile] = useState(false);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
  }

  if (file) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileContent = fileReader.result as string;
      setFileContents(fileContent);
    };
    fileReader.readAsText(file);
  }

  return (
    <main className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-2 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full h-full items-center sm:items-start">
        <div className="grid grid-cols-2 gap-2 w-full h-full">
          <div className="flex flex-col w-full gap-2 border-2 border-indigo-400 rounded p-4">
            <div className="flex flex-row w-full">
              <Input
                type="text"
                label="Resource for Test Data Generation"
                radius="sm"
                labelPlacement="outside"
                startContent={
                  <div className="flex items-center">
                    <label className="sr-only" htmlFor="method">
                      Method
                    </label>
                    <select
                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                      id="method"
                      name="method"
                    >
                      <option>GET</option>
                      <option>PUT</option>
                      <option>POST</option>
                      <option>DELETE</option>
                    </select>
                  </div>
                }
              />
            </div>
            <div>
              <Textarea
                variant="bordered"
                placeholder="Test data will be generated here"
                className="w-full h-full"
                color="primary"
                radius="sm"
                isReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 border-2 border-indigo-400 rounded p-4">
            <div>
              <span className="text-sm">
                Select an Open API Spec for which test data is to be generated
              </span>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-2 w-full">
                  <Input
                    type="file"
                    onChange={handleChange}
                    radius="sm"
                    accept=".yaml,.yml,.json"
                  />
                  <Button
                    type="submit"
                    radius="sm"
                    color="primary"
                    isLoading={isReadingFile}
                  >
                    {(() => {
                      if (!isReadingFile) return <MdFileUpload color="WHITE" />;
                    })()}
                  </Button>
                </div>
              </form>
            </div>
            <div className="flex flex-col w-full h-full">
              <Textarea
                variant="bordered"
                label="Paste the Open API Specification Here"
                placeholder="Open API Spec (Eg. PetStore Spec)"
                className="w-full h-full"
                color="primary"
                value={fileContents}
                radius="sm"
              />
              <Button radius="sm" color="primary" size="lg">
                Validate & Train
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
