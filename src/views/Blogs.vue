<template>

  <div>
    <Header/>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination
          class="tpage"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-count="pages"
          :total="total"
          @current-change=page>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Blogs",
  components: {Header},
  data() {
    return {
      blogs: {},
      currentPage: 1, // 当前页
      total: 0, // blog 总数
      pages: 0, // 总页数
      pageSize: 5 // 每页数量
      // TODO: 支持修改
    }
  },
  methods: {
    page(currentPage) {
      const _this = this;
      _this.$axios.get('/blogs?currentPage=' + currentPage).then(resp => {
        _this.blogs = resp.data.data.records
        _this.currentPage = resp.data.data.current
        _this.total = resp.data.data.total
        _this.pages = resp.data.data.pages
        _this.pageSize = resp.data.data.size
      })
    }
  },
  created() {
    this.page(this.currentPage);
  }
}
</script>

<style scoped>
.tpage {
  margin: 0 auto;
  text-align: center;
}
</style>
