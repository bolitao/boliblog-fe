<template>
  <div>
    <Header/>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link>
      </el-link>
      <el-divider/>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import "github-markdown-css"

export default {
  name: "BlogDetail",
  components: {Header},
  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      const _this = this;
      this.$axios.get('/blogs/' + blogId).then(res => {
        const blog = res.data.data;
        _this.blog.id = blog.id;
        _this.blog.title = blog.title;

        let MarkdownIt = require('markdown-it');
        let md = new MarkdownIt();
        _this.blog.content = md.render(blog.content);

        _this.ownBlog = _this.$store.getters.getUser.id === blog.userId;
      });
    }
  },
  data() {
    return {
      blog: {
        id: '',
        title: 'default',
        content: 'default_content',
        userId: '-1'
      },
      ownBlog: false
    }
  }
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 10px;
}
</style>
