'use client';
import React, { useState } from 'react';
import EmotionBar from '@/app/components/reportGraphs/EmotionBar';
import MoodTrend from '@/app/components/reportGraphs/MoodTrend';
import Wrapper from '@/app/components/global/Wrapper';
import html2canvas from 'html2canvas';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
export default function page() {
  const [loading, setloading] = useState(false);
  const [url, seturl] = useState(null);
  const uploadBlob = async (blob) => {
    var formData = new FormData();
    console.log(blob);

    formData.append('file', blob);
    console.log(formData);
    fetch(
      'http://localhost:8000/api/report/upload',
      {
        method: 'POST',
        body: formData,
      },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
      .then((res) => res.json())
      .then((response) => {
        seturl(response.url);
        toast('Saved Successfully!', 'success');
        console.log(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setloading(false);
      });
  };
  const printDocument = async () => {
    const input = document.getElementById('reportSection');
    setloading(true);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ format: [500, 450] });
      pdf.addImage(imgData, 'JPEG', 0, 0);
      const blob = pdf.output('blob');
      uploadBlob(blob);
      //   saveAs(blob, 'report-1.pdf');
      //   pdf.save
      //   var a = document.createElement('a');
      //   document.body.appendChild(a);
      //   a.style = 'display: none';

      //   var url = window.URL.createObjectURL(blob);
      //   a.href = url;
      //   a.download = 'report.pdf';
      //   a.click();
      //   window.URL.revokeObjectURL(url);
    });
  };
  return (
    <>
      <Wrapper>
        <div className="p-2">
          <div className="flex justify-center gap-5 mb-5">
            {loading ? (
              <div className="flex gap-4 items-center">
                <div>Saving</div> <Spinner variant="success" />
              </div>
            ) : (
              <>
                <Button
                  className=""
                  variant="outline-success"
                  onClick={() => {}}
                >
                  Print To Pdf
                </Button>
                <Button variant="outline-success" onClick={printDocument}>
                  Save Report
                </Button>
              </>
            )}
            {url == null ? (
              ''
            ) : (
              <div>
                <Button variant="outline-primary">
                  <a href={url} target="_blank" className="color-black">
                    View File
                  </a>
                </Button>
              </div>
            )}
          </div>
          <div
            id="reportSection"
            className="text-center w-[1400px] mx-auto pt-5 border-1 pb-3 rounded-md border-gray"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold self-center mb-4">
                Well-Being Report
              </div>
              <div className="flex justify-between w-1/2 mx-auto">
                <div>
                  <span className="font-semibold">User: </span>
                  Jai
                </div>
                <div>
                  <span className="font-semibold">Therapist: </span>
                  Hehe
                </div>
              </div>
              <hr className="h-0.5 border-2 border-black bg-black w-1/2 mx-auto my-4" />
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-7 px-5">
                <div>
                  <h3 className="text-center font-semibold">
                    Recent Mood history
                  </h3>
                  <MoodTrend />
                </div>
                <div>
                  <h3 className="text-center font-semibold">Emotion Tracker</h3>
                  <EmotionBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
