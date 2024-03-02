const btnContainer = document.getElementById("button-container");
let movieContainer = document.getElementById("movieContainer");
const noDataDiv = document.getElementById("noDataDiv");
const sortBtn = document.getElementById("sort-button");

let category_id = 1000;

// this is for sorting
let sorted = false;

sortBtn.addEventListener("click", () => {
   sorted = true;
   getParticularCategory(category_id, sorted);
});

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
      button.className = "cat-btn btn btn-primary mx-2";
      button.innerText = cat.category;

      button.addEventListener("click", () => {
         const allCatBtn = document.querySelectorAll(".cat-btn");
         allCatBtn.forEach((btn) => btn.classList.remove("bg-red-500"));
         button.classList.add("bg-red-500");
         getParticularCategory(`${cat.category_id}`);
      });

      btnContainer.appendChild(button);
   });

   const firstCatButton = document.querySelector(".cat-btn");
   firstCatButton.classList.add("bg-red-500");
};

// 3rd function
const getParticularCategory = async (cat_id, sorted) => {
   category_id = cat_id;
   const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${category_id}`
   );
   const data = await res.json();
   const categoryDetails = data.data;

   // sorting data functionality
   if (sorted) {
      categoryDetails.sort((a, b) => {
         const totalViewsStrFirst = a.others?.views.replace("K", "");
         const totalViewsStrSecond = b.others?.views.replace("K", "");

         const totalViewFirstNumber = parseFloat(totalViewsStrFirst) || 0;
         const totalViewSecondNumber = parseFloat(totalViewsStrSecond) || 0;

         return totalViewSecondNumber - totalViewFirstNumber;
      });
   }

   // if no data show a div.
   categoryDetails.length === 0
      ? noDataDiv.classList.remove("hidden")
      : noDataDiv.classList.add("hidden");

   movieContainer.innerHTML = "";
   for (let category of categoryDetails) {
      // conditioning: to show verified badge or not
      const isVerified = category.authors[0].verified || false;
      let verifiedBadge = "";
      if (isVerified) {
         verifiedBadge = `<img class="verify-img" src="assets/icons8-media-64.png" alt="" />`;
      }

      // creating individual divs for each item
      const div = document.createElement("div");
      div.innerHTML = `
        <!-- main image -->
        <img src="${category.thumbnail}" alt="" />
        <div class="flex items-center space-x-3 mt-3">
            <!-- icon -->
            <div >
                <img src="${
                   category.authors[0].profile_picture
                }" class="rounded-full w-14 h-14 object-cover" alt="" />
            </div>
            <!-- details -->
            <div>
                <h3>${category.title}</h3>
                <p>${category.authors[0].profile_name}</p>
                <p>${category.others.views.replace("K", "")}K Views</p>
                ${verifiedBadge}
            </div>
        </div>
        
        `;

      movieContainer.appendChild(div);
   }
};

getParticularCategory(category_id, sorted);
