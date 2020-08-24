<script lang="ts">
  import { url, isActive } from "@sveltech/routify";

  interface Route {
    name: string;
    url: string;
  }

  function makeRoute(url: string, name: string) {
    return {
      name,
      url,
    };
  }

  const routes: Route[] = [
    makeRoute("./index", "Home"),
    makeRoute("./people", "People"),
    makeRoute("./records", "Records"),
  ];
</script>

<style>
  .page {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  nav {
    flex: 0 1 auto;
  }

  .content {
    flex: 1 1 auto;
  }

  ul {
    background-color: rgb(255, 236, 169);

    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    justify-content: center;
  }

  li a {
    display: block;
    color: rgb(0, 0, 0);
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover {
    background-color: rgba(0, 0, 0, 0.19);
  }

  a:active,
  .active {
    background-color: rgba(0, 0, 0, 0.19);
  }
</style>

<div class="page">

  <nav>
    <ul>
      {#each routes as route}
        <li class:active={$isActive(route.url)}>
          <a href={$url(route.url)}>{route.name}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <slot class="content" />

</div>
