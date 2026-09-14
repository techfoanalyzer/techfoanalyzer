export async function getBookCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/all-category`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.status) {
      return data;
    }

    return null;
  } catch (error) {
    console.error(
      "Error fetching book categories:",
      error?.message
    );
    return null;
  }
}

export async function getBooks() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/get-all`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.status) {
      return data;
    }

    return null;
  } catch (error) {
    console.error(
      "Error fetching books:",
      error?.message
    );
    return null;
  }
}

export async function getBooksByCategory(categoryid) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/get-by-category/${categoryid}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.status) {
      return data;
    }

    return null;
  } catch (error) {
    console.error(
      "Error fetching books by category:",
      error?.message
    );
    return null;
  }
}

export async function getBook(bookid) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/show/${bookid}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.status) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching book details:", error?.message);
    return null;
  }
}

export async function getBookCategoryBySlug(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/show-by-slug/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.status) {
      return data;
    }

    return null;
  } catch (error) {
    console.error(
      "Error fetching book category by slug:",
      error?.message
    );
    return null;
  }
}