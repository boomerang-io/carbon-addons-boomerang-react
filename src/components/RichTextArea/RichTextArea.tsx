/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2025
*/

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { Toolbar, ToolbarButton, ToolbarGroup, pkg } from "@carbon/ibm-products";
import "quill/dist/quill.snow.css";
import { prefix } from "../../internal/settings";
import { TextBold, TextItalic, TextUnderline, ListBulleted, ListNumbered, Link } from "@carbon/react/icons";
import { TextInput, Button } from "@carbon/react";
import cx from "classnames";
import sanitizeHtml from "sanitize-html";

type Props = React.ComponentPropsWithRef<"input"> & {
  value?: string;
  onChange?: (...args: any) => any;
  setError?: (...args: any) => any;
  helperText?: React.ReactNode;
  invalid?: boolean;
  label?: string;
  labelText?: React.ReactNode;
  maxWordCount?: number;
};

const RichTextAreaComponent = React.forwardRef<any, Props>(function RichTextAreaComponent(
  { label, labelText, maxWordCount, value, helperText, placeholder, onChange, setError },
  ref
) {
  pkg.component.ToolbarGroup = pkg.component.Toolbar = pkg.component.ToolbarButton = true;
  const labelValue = label || labelText;
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [url, setUrl] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [savedSelection, setSavedSelection] = useState<any>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [noSelection, setNoSelection] = useState(false);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: false,
        },
        placeholder,
      });
      quillRef.current = quill;
      if (value) {
        const cleanHtml = sanitizeHtml(value, {
          allowedTags: ["p", "strong", "b", "i", "em", "u", "ol", "ul", "li", "a"],
          allowedAttributes: {
            a: ["href", "rel", "target"],
          },
        });
        quillRef.current.clipboard.dangerouslyPasteHTML(cleanHtml);
        const length = quillRef.current.getLength();
        quillRef.current.setSelection(length, 0);
        setWordCount(getWordCount());
        if (setError) {
          setError(maxWordCount && getWordCount() > maxWordCount);
        }
      }
      quill.on("text-change", () => {
        const currentCount = getWordCount();
        setWordCount(currentCount);
        const wordCountExceeded = maxWordCount && currentCount > maxWordCount;
        if (onChange && !wordCountExceeded) {
          onChange(quill.getSemanticHTML());
        }
        if (setError) {
          setError(wordCountExceeded);
        }
      });
    }
  }, []);

  const handleBold = () => {
    quillRef.current?.format("bold", !quillRef.current.getFormat().bold);
  };

  const handleItalic = () => {
    quillRef.current?.format("italic", !quillRef.current.getFormat().italic);
  };

  const handleUnderline = () => {
    quillRef.current?.format("underline", !quillRef.current.getFormat().underline);
  };

  const handleOrderedList = () => {
    quillRef.current?.format("list", "ordered");
  };

  const handleBulletList = () => {
    quillRef.current?.format("list", "bullet");
  };

  const handleLinkBtn = () => {
    const selection = quillRef.current?.getSelection();
    if (selection && selection.length > 0) {
      setSavedSelection(selection);
      setShowUrlInput(true);
    } else {
      setNoSelection(true);
    }
  };

  const handleLinkInsert = () => {
    if (url) {
      const range = savedSelection || quillRef.current?.getSelection();
      if (range?.length) {
        quillRef.current?.formatText(range.index, range.length, "link", url);
      }
    }
    setShowUrlInput(false);
    setSavedSelection(null);
    setUrl("");
  };

  const handleLinkCancel = () => {
    setShowUrlInput(false);
    setSavedSelection(null);
    setUrl("");
  };

  const getWordCount = () => {
    if (quillRef.current && maxWordCount) {
      const text = quillRef.current.getText();
      const words = text.trim().split(/\s+/);
      return words.filter((word) => word.length > 0).length;
    }
    return 0;
  };

  const wordCountExceeded = maxWordCount && wordCount > maxWordCount;

  return (
    <>
      <div className={`${prefix}--rich-text-editor-labels`}>
        {labelValue ? <div className={`${prefix}--label`}>{labelValue}</div> : null}
        {maxWordCount ? (
          <div
            className={cx(`${prefix}--label`, { [`${prefix}--rich-text-editor-error`]: wordCount > maxWordCount })}
          >{`${wordCount}/${maxWordCount}`}</div>
        ) : null}
      </div>
      <Toolbar className={`${prefix}--rich-text-editor-toolbar`}>
        <ToolbarGroup>
          <ToolbarButton onClick={handleBold} label="Bold" renderIcon={(props) => <TextBold size={16} {...props} />} />
          <ToolbarButton
            onClick={handleItalic}
            label="Italic"
            renderIcon={(props) => <TextItalic size={16} {...props} />}
          />
          <ToolbarButton
            onClick={handleUnderline}
            label="Underline"
            renderIcon={(props) => <TextUnderline size={16} {...props} />}
          />
          <ToolbarButton
            onClick={handleBulletList}
            label="Bulleted List"
            renderIcon={(props) => <ListBulleted size={16} {...props} />}
          />
          <ToolbarButton
            onClick={handleOrderedList}
            label="Numbered List"
            renderIcon={(props) => <ListNumbered size={16} {...props} />}
          />
          <ToolbarButton
            onClick={() => handleLinkBtn()}
            label="Hyperlink"
            renderIcon={(props) => <Link size={16} {...props} />}
          />
        </ToolbarGroup>
      </Toolbar>
      {showUrlInput && (
        <div className={`${prefix}--rich-text-editor-url-input`}>
          <TextInput
            onChange={(e: any) => {
              setUrl(e.target.value);
            }}
            id="hyperlink-input"
            placeholder="Enter URL"
            size="sm"
            type="url"
            labelText=""
          />
          <Button onClick={() => handleLinkInsert()} kind="ghost" size="sm">
            OK
          </Button>
          <Button onClick={() => handleLinkCancel()} kind="ghost" size="sm">
            Cancel
          </Button>
        </div>
      )}
      <div
        className={cx({
          [`${prefix}--rich-text-editor-error-border`]: wordCountExceeded,
        })}
      >
        <div className={`${prefix}--rich-text-editor`} onFocus={() => setNoSelection(false)} ref={editorRef}></div>
      </div>
      <div className={`${prefix}--rich-text-editor-footer`}>
        {!noSelection && !wordCountExceeded && helperText ? (
          <div className={`${prefix}--label`}>{helperText}</div>
        ) : null}
        {wordCountExceeded ? (
          <div className={cx(`${prefix}--label`, `${prefix}--rich-text-editor-error`)}>Exceeded Word Count</div>
        ) : null}
        {noSelection ? (
          <div className={cx(`${prefix}--label`, `${prefix}--rich-text-editor-error`)}>
            Select text before adding link
          </div>
        ) : null}
      </div>
    </>
  );
});

export default RichTextAreaComponent;
