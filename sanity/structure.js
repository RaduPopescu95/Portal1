export const deskStructure = (S) =>
  S.list()
    .title("Firme Amenajari Gradini")
    .items([
      S.listItem()
        .title("Setari site")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Setari site")
        ),
      S.divider(),
      S.documentTypeListItem("company").title("Firme"),
      S.documentTypeListItem("county").title("Judete"),
      S.documentTypeListItem("city").title("Localitati"),
      S.documentTypeListItem("serviceCategory").title("Categorii"),
      S.documentTypeListItem("imageLibrary").title("Imagini"),
      S.documentTypeListItem("localLandingPage").title("Pagini locale"),
      S.documentTypeListItem("article").title("Articole"),
      S.documentTypeListItem("staticPage").title("Pagini statice"),
      S.documentTypeListItem("redirect").title("Redirecturi"),
    ]);
