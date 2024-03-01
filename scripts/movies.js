const btnContainer = document.getElementById("button-container");
let movieContainer = document.getElementById("movieContainer");
const noDataDiv = document.getElementById("noDataDiv");

// 1st function
const loadAllCategories = async () => {
   const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
   );
   const data = await res.json();
   const allCategories = await data.data;

   // display on the page now
   displayCategories(allCategories);
};

loadAllCategories();

// 2nd function
const displayCategories = (cats) => {
   cats.forEach((cat) => {
      const button = document.createElement("button");
      button.className = "btn btn-primary mx-2";
      button.innerText = cat.category;
      button.addEventListener("click", () => {
         getParticularCategory(`${cat.category_id}`);
      });
      btnContainer.appendChild(button);
   });
};

// 3rd function
const getParticularCategory = async (cat_id) => {
   const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${cat_id}`
   );
   const data = await res.json();
   const categoryDetails = data.data;
   console.log(categoryDetails);

   movieContainer.innerHTML = "";

   // if no data show a div.

   categoryDetails.length === 0
      ? noDataDiv.classList.remove("hidden")
      : noDataDiv.classList.add("hidden");

   for (let category of categoryDetails) {
      console.log(category);

      const div = document.createElement("div");
      div.innerHTML = `
        <!-- main image -->
        <img src="${category.thumbnail}" alt="" />
        <div>
            <!-- icon -->
            <div>
                <img src="" alt="" />
            </div>
            <!-- details -->
            <div>
                <h3>${category.title}</h3>
                <p>Author Name</p>
                <p>100k Views</p>
            </div>
        </div>
        
        `;
      movieContainer.appendChild(div);
   }
};
