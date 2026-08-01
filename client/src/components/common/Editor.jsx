"use client";
import { useState, useEffect, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Alignment,
  AutoImage,
  Autoformat,
  ImageBlock,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Emoji,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  ImageCaption,
  ImageInsertViaUrl,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageInline,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  MediaEmbed,
  MediaEmbedStyle,
  MediaEmbedToolbar,
  Mention,
  RemoveFormat,
  ShowBlocks,
  SourceEditing,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableToolbar,
  TableColumnResize,
  TableProperties,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  ImageUpload,
  SimpleUploadAdapter,
  ImageInsert,
  PictureEditing,
  BalloonToolbar,
  BlockToolbar,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default function Editor({ props }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editorConfig = useMemo(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : "";

    return {
      root: {
        placeholder: "Type or paste your content here!",
      },
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "sourceEditing",
          "showBlocks",
          "textPartLanguage",
          "fullscreen",
          "|",
          "heading",
          "style",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "code",
          "removeFormat",
          "|",
          "emoji",
          "horizontalLine",
          "link",
          "insertImage",
          "mediaEmbed",
          "insertTable",
          "highlight",
          "blockQuote",
          "codeBlock",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Alignment,
        Autoformat,
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        BlockToolbar,
        Bold,
        Code,
        CodeBlock,
        Emoji,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Fullscreen,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        HtmlComment,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageResizeEditing,
        ImageResizeHandles,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        SimpleUploadAdapter,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        MediaEmbed,
        MediaEmbedStyle,
        MediaEmbedToolbar,
        Mention,
        Paragraph,
        PictureEditing,
        RemoveFormat,
        ShowBlocks,
        SourceEditing,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableToolbar,
        TableColumnResize,
        TableProperties,
        TextPartLanguage,
        TextTransformation,
        TodoList,
        Underline,
      ],

      simpleUpload: {
        uploadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/upload-ckeditor-image`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },

      licenseKey: "GPL",
      autosave: {},
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "|",
        "bulletedList",
        "numberedList",
      ],
      blockToolbar: [
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
      ],
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      fullscreen: {
        onEnterCallback: (container) =>
          container.classList.add(
            "editor-container",
            "editor-container_classic-editor",
            "editor-container_include-style",
            "editor-container_include-block-toolbar",
            "editor-container_include-fullscreen",
            "main-container"
          ),
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },

      // -------------------------------------------------------------
      // Image Config Updates (Image Radius Feature Included)
      // -------------------------------------------------------------
      image: {
        resizeUnit: "%",
        resizeOptions: [
          {
            name: "resizeImage:original",
            value: null,
            icon: "original",
          },
          {
            name: "resizeImage:25",
            value: "25",
            icon: "small",
          },
          {
            name: "resizeImage:50",
            value: "50",
            icon: "medium",
          },
          {
            name: "resizeImage:75",
            value: "75",
            icon: "large",
          },
        ],
        styles: {
          options: [
            "inline",
            "block",
            "side",
            {
              name: "imageRadiusSmall",
              title: "Radius 8px",
              className: "image-radius-sm",
              modelElements: ["imageBlock", "imageInline"],
            },
            {
              name: "imageRadiusMedium",
              title: "Radius 16px",
              className: "image-radius-md",
              modelElements: ["imageBlock", "imageInline"],
            },
            {
              name: "imageRadiusRounded",
              title: "Circle / Rounded",
              className: "image-radius-full",
              modelElements: ["imageBlock", "imageInline"],
            },
          ],
        },
        toolbar: [
          "imageStyle:inline",
          "imageStyle:block",
          "imageStyle:side",
          "|",
          "imageStyle:imageRadiusSmall",
          "imageStyle:imageRadiusMedium",
          "imageStyle:imageRadiusRounded",
          "|",
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "resizeImage:25",
          "resizeImage:50",
          "resizeImage:75",
          "resizeImage:original",
        ],
      },

      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      mediaEmbed: {
        toolbar: ["mediaEmbed:breakText", "mediaEmbed:wrapText"],
      },
      mention: {
        feeds: [{ marker: "@", feed: [] }],
      },
      style: {
        definitions: [
          { name: "Article category", element: "h3", classes: ["category"] },
          { name: "Title", element: "h2", classes: ["document-title"] },
          { name: "Subtitle", element: "h3", classes: ["document-subtitle"] },
          { name: "Info box", element: "p", classes: ["info-box"] },
          {
            name: "CTA Link Primary",
            element: "a",
            classes: ["button", "button--green"],
          },
          {
            name: "CTA Link Secondary",
            element: "a",
            classes: ["button", "button--black"],
          },
          { name: "Marker", element: "span", classes: ["marker"] },
          { name: "Spoiler", element: "span", classes: ["spoiler"] },
        ],
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
    };
  }, []);

  if (!isMounted)
    return <div className="p-4 text-gray-500">Loading editor...</div>;

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-fullscreen">
        <div className="editor-container__editor [&_.ck-content_h1]:text-3xl [&_.ck-content_h1]:font-bold [&_.ck-content_h1]:my-4 [&_.ck-content_h2]:text-2xl [&_.ck-content_h2]:font-bold [&_.ck-content_h2]:my-3 [&_.ck-content_h3]:text-xl [&_.ck-content_h3]:font-bold [&_.ck-content_h3]:my-2 [&_.ck-content_h4]:text-lg [&_.ck-content_h4]:font-bold [&_.ck-content_h5]:text-base [&_.ck-content_h5]:font-bold [&_.ck-content_h6]:text-sm [&_.ck-content_h6]:font-bold [&_.ck-content_ul]:list-disc [&_.ck-content_ul]:ml-5 [&_.ck-content_ol]:list-decimal [&_.ck-content_ol]:ml-5">
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={props?.initialData || ""}
            onChange={(event, editor) => {
              if (props?.onChange) {
                props.onChange(event, editor);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}