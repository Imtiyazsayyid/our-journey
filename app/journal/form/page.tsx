"use client";

import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGlobalContext } from "@/context/GlobalProvider";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleJournalEntry, saveJournalEntry } from "@/lib/actions/journal.actions";
import MyQuill from "@/components/MyQuill";
import UploadCloudinary from "@/components/UploadCloudinary";
import useAppwrite from "@/lib/useAppwrite";
import MyDatePicker from "@/components/DatePicker";
import StandardSuccessToast from "@/components/StandardSuccessToast";
import StandardErrorToast from "@/components/StandardErrorToast";

interface Props {
  searchParams: {
    journal_id: string;
  };
}

const FormPage = ({ searchParams }: Props) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    date: new Date() as Date | null,
    images: "",
  });

  async function getSingleJournal() {
    if (searchParams.journal_id) {
      const data = await getSingleJournalEntry(searchParams.journal_id);

      setForm({
        title: data.title,
        content: data.content,
        date: moment(data.date, "DD/MM/YYYY").toDate(),
        images: data.imageURL,
      });
    }
  }

  useEffect(() => {
    getSingleJournal();
  }, []);

  const { user } = useGlobalContext();

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);

    if (!form.title && !form.content) {
      console.log("Error: All Fields Required");
      return;
    }

    try {
      const journalEntryData = {
        ...form,
        date: moment(form.date, "DD MMMM, YYYY").format("DD/MM/YYYY"),
        username: user.username,
      };

      // @ts-ignore
      const jounral = await saveJournalEntry({ journal_id: searchParams.journal_id, ...journalEntryData });

      if (jounral) {
        StandardSuccessToast(
          "Submitted Successfully",
          searchParams.journal_id
            ? "Your memory has been updated successfully."
            : "A new memory has been added to your jounral."
        );
      } else {
        StandardErrorToast("Request Failed", "We Could Not Process Your Request, Please Fill In Required Information.");
      }

      router.push(`/journal`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center min-h-screen py-20">
      <div className="h-full w-full max-w-[1000px] p-10">
        <h1 className="text-4xl md:text-7xl font-bold mb-10">Store A Memory</h1>

        <p className="mb-2 text-lg font-bold">Upload A Photo About Today</p>
        {/* <FileUploader files={form.images} onChange={(val) => setForm({ ...form, images: val })} /> */}
        <div className="w-full">
          <UploadCloudinary
            link={form.images}
            setLink={(val) => setForm({ ...form, images: val })}
            divStyle="w-full h-[50vh] rounded-xl overflow-hidden"
          />
        </div>

        <p className="mt-10 mb-2 text-lg font-bold">Date</p>
        <MyDatePicker
          containerClass="w-full md:w-96"
          value={form.date}
          onChange={(date) => {
            setForm({ ...form, date });
          }}
        />

        <p className="mt-10 mb-2 text-lg font-bold">Title</p>
        <Input
          placeholder="Title"
          className="shad-input mb-10"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <p className="mt-10 mb-2 text-lg font-bold">What Was Your Day Like?</p>
        <Textarea
          className="h-[600px] shad-textArea resize-none mb-10"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        {/* <MyQuill value={form.content} setValue={(val) => setForm({ ...form, content: val })} /> */}

        <div className="flex justify-center mt-20 gap-2" onClick={onSubmit}>
          <Button
            className="bg-rose-800 hover:opacity-90 font-semibold h-11 w-fit"
            disabled={isLoading}
            onClick={router.back}
          >
            Go Back
          </Button>
          <Button className="bg-fun-200 hover:opacity-90 font-semibold h-11 w-96" disabled={isLoading}>
            {searchParams.journal_id ? "Update" : "Create"} Memory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
