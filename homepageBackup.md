  <div class="mx-8 w-full">
    <div
      class="
        p-10
        grid grid-cols-1
        sm:grid-cols-1
        md:grid-cols-1
        lg:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-5
        content-center
        overflow-hidden
      "
    >
      <% for(let i = 0; i < games.length; i++) { %>
      <div
        class="
          bg-containcolor
          overflow-hidden
          shadow-lg
          rounded-3xl
          p-4
          transform
          transition
          duration-500
          hover:scale-105
        "
      >
        <a href="/<%- games[i].id %>">
          <h2 class="text-fontcs text-4xl py-2 minHeight-50">
            <%- games[i].name %>
          </h2>
          <img
            class="object-cover h-48 w-full"
            src="<%- games[i].img %>"
            alt="Picture of Game"
          />
          <span class="text-white">RELEASED: <%- games[i].released %></span>
          <span class="text-white block"
            >PLATFORMS: <%- games[i].platforms %></span
          >
        </a>
      </div>

      <% } %>
    </div>

    <div
      class="
        container
        flex
        justify-center
        feed
        bg-containcolor
        rounded-lg
        w-4/5
        mt-20
      "
    >
      <form action="homepage/createPost" method="POST">
        <label for="newPost">
          <textarea
            class="mt-6 rounded-md bg-white pl-3 pt-3 w-full"
            name="newPost"
            id="newPost"
            cols="100"
            rows="3"
            spellcheck="false"
          ></textarea>

          <div>
            <button class="btn btn-blue">Post</button>
          </div>
        </label>
      </form>
    </div>

    <div class="feed text-white flex"><%- include("partials/feed.ejs") %></div>

  </div>
</div>
