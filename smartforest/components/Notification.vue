<template>
  <div :id=idcont class="notification-container">
    <div class="infobox">
        <div :id=idtime class="datetime-notification"></div>
        <div><p :id=id class="tips"></p></div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        id: String,
        idcont: String,
        idtime: String
    },

}
</script>

<style scoped>

.datetime-notification {
    /* background-color: yellow; */
    width: 250px;
    padding: 5px 20px;
    padding-bottom: 0;
    /* background-color: aquamarine; */
    font-weight: 300;
}
p {
    margin: 0;
    line-height: 1em;
}
.notification-container {
    position: relative;
    width: 375px;
    /* height: 120px; */
    margin: auto;
    /* top: 500px; */
    padding: 0.5em 1em;
    background: white;
    border-radius: 100px;
    /* border-top-left-radius: 0;
    border-bottom-left-radius: 0; */
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 0.5em;
    visibility: hidden;
    opacity: 0%;
}

.tips {
    font-size: 1.25em;
    padding: 5px 20px;
    margin: auto;
    bottom: 0;
    top: 0;
    font-weight: 500;
    font-style:normal;
    color: black;
    /* height: 120px; */
    /* background-color: violet; */
}
</style>