<template>
  <div style="padding: 46px 0 70px 0">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
      fixed
    />
    <!-- 文章身体 -->
    <div class="main">
      <h5 class="keywords">{{ articleTitle }}</h5>
      <!--  -->
      <div class="authorInfo">
        <div class="head_portrait">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="textParticulars.aut_photo"
            class="myImg"
          />
        </div>
        <div class="authorName">
          <div class="authorname">{{ textParticulars.aut_name }}</div>
          <div class="release_time">
            {{ textParticulars.pubdate | fromNowDate }}
          </div>
        </div>
        <div class="ttention_button">
          <van-button
            type="info"
            round
            class="attention"
            v-if="!textParticulars.is_followed"
            @click="is_attention"
            >关注</van-button
          >
          <van-button
            type="info"
            round
            class="attention"
            v-else
            @click="is_attention"
            >已关注</van-button
          >
        </div>
      </div>
      <div
        class="article-content markdown-body texts"
        v-html="textParticulars.content"
      ></div>
      <!-- 正文结束分割线 -->
      <van-divider>正文结束</van-divider>
    </div>
    <!-- 评论列表 -->
    <div class="comment" v-for="(item, index) in commentResults" :key="item.id">
      <div class="userportrait">
        <van-image
          round
          width="1rem"
          height="1rem"
          :src="item.aut_photo"
          class="myImg"
        />
      </div>
      <div class="text">
        <div class="comName">{{ item.aut_name }}</div>
        <div class="comText">{{ item.content }}</div>
        <div class="timer">
          <span>{{ item.pubdate | fromNowDate }}</span>
          <button
            class="com_reply"
            @click="replyShowFn(item, item.reply_count, index)"
          >
            回复 {{ item.reply_count }}
          </button>
        </div>
      </div>
      <div class="icon">
        <div
          @click="lickComment(item, index)"
          :class="{ is_collected: item.is_liking }"
        >
          <span class="iconfont icon-dianzan2"></span>
          {{ item.is_liking ? "取消" : "赞" }}
        </div>
      </div>
    </div>
    <div class="noMore">
      <span>没有更多了</span>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="writeComment">
        <button class="write" @click="commentBox = true">写评论</button>
      </div>
      <div class="icons">
        <span class="iconfont icon-pinglun icon-01">
          <span class="comNumber" v-if="commentResults.length">{{
            commentResults.length
          }}</span>
        </span>
        <span
          class="iconfont icon-shoucang icon-02"
          @click="collection"
          :class="{ is_collected: textParticulars.is_collected }"
        ></span>
        <span
          class="iconfont icon-dianzan2 icon-03"
          @click="likeArticle"
          :class="{
            is_collected: attitude,
          }"
        ></span>
        <span class="iconfont icon-fenxiang icon-04"></span>
      </div>
    </div>
    <!-- footer 写评论的弹出层 -->
    <div class="commentPopups">
      <van-popup
        v-model="commentBox"
        position="bottom"
        :style="{ height: '20%' }"
      >
        <van-field
          v-model.trim="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          class="textarea"
        >
          <template #extra>
            <button class="publish" :disabled="!message" @click="publishCom">
              发布
            </button>
          </template>
        </van-field>
      </van-popup>
    </div>
    <!-- replybox 回复评论的弹出层 -->
    <van-popup v-model="replyShow" position="bottom" :style="{ height: '80%' }">
      <!-- N条回复 -->
      <van-nav-bar :title="`${reply_count}条回复`" />
      <div class="comment">
        <div class="userportrait">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="replyitem.aut_photo"
            class="myImg"
          />
        </div>
        <div class="text">
          <div class="comName">{{ replyitem.aut_name }}</div>
          <div class="comText">{{ replyitem.content }}</div>
          <div class="timer">
            <span>{{ replyitem.pubdate | fromNowDate }}</span>
            <button class="com_reply">回复 {{ replyitem.reply_count }}</button>
          </div>
        </div>
        <div class="icon">
          <div
            :class="{ is_collected: replyitem.is_liking }"
            @click="lickComment(replyitem, itemIndex)"
          >
            <span class="iconfont icon-dianzan2"></span>
            {{ replyitem.is_liking ? "取消" : "赞" }}
          </div>
        </div>
      </div>
      <!-- 全部回复 -->
      <van-cell-group>
        <van-cell title="全部回复" />
      </van-cell-group>
      <!-- 评论回复 -->
      <div v-for="item in replys.results" :key="item.com_id" class="comment">
        <div class="userportrait">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="item.aut_photo"
            class="myImg"
          />
        </div>
        <div class="text">
          <div class="comName">{{ item.aut_name }}</div>
          <div class="comText">{{ item.content }}</div>
          <div class="timer">
            <span>{{ item.pubdate | fromNowDate }}</span>
            <button class="com_reply">回复 {{ item.reply_count }}</button>
          </div>
        </div>
        <div class="icon">
          <div>
            <span class="iconfont icon-dianzan2"></span>
            赞
          </div>
        </div>
      </div>
      <!-- 没有更多了 -->
      <div class="noMore" style="margin-bottom: 92px">
        <span>没有更多了</span>
      </div>
      <div class="replySearch">
        <van-button
          type="default"
          class="replySearch_btn"
          @click="publishComReply"
          >评论</van-button
        >
      </div>
    </van-popup>
    <!-- 回复评论弹出层 内的底部弹出层 -->
    <div class="commentPopups">
      <van-popup
        v-model="replysShow"
        position="bottom"
        :style="{ height: '20%' }"
      >
        <van-field
          v-model.trim="message02"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          class="textarea"
        >
          <template #extra>
            <button
              class="publish"
              :disabled="!message02"
              @click="publishCom02"
            >
              发布
            </button>
          </template>
        </van-field>
      </van-popup>
    </div>
  </div>
</template>

<script>
// API
import dayjs from "@/utils/dayjs";
import {
  // 获取新闻详情
  getNewsDetails,
  // 获取文章评论
  getComments,
  // 发布评论
  publishComment,
  // 收藏文章
  collectionOfArticles,
  // 取消收藏文章
  cancelCollection,
  // 文章点赞
  likeArticle,
  // 取消点赞
  cancelLick,
  // 关注文章作者 关注用户
  attentionAuthor,
  // 取消关注作者  接口
  cancelFollowing,
  // 点赞评论
  lickComment,
  // 取消评论点赞
  cancelLickComment,
} from "@/apis";
export default {
  name: "ArticleDetails",
  data() {
    return {
      // 文章关键词
      articleTitle: localStorage.getItem("articleTitle"),
      // 该页文章的文章id
      textId: localStorage.getItem("textId"),
      // 文章详情里面的信息
      textParticulars: {},
      // 评论的id信心
      commentData: {},
      // 评论列表的数组
      commentResults: [],
      // 评论盒子的显示与否
      commentBox: false,
      // 评论框中的内容
      message: "",
      // 是否点赞了该文章
      attitude: false,
      // 评论盒子的显示与否
      replyShow: false,
      // 所点击的回复评论盒子 的所有信息
      replyitem: {},
      // 评论数量
      reply_count: "",
      itemIndex: "",
      // 获取到的评论回复数据
      replys: [],
      // 评论回复弹出层  里面的 底部评论框中的内容
      reply_value: "",
      // 评论回复弹框 内部的 发布评论弹框
      replysShow: false,
      message02: "",
    };
  },
  methods: {
    // 获取新闻详情
    async getNewsDetails() {
      try {
        const res = await getNewsDetails(this.textId);
        this.textParticulars = res.data.data;
        console.log(this.textParticulars);
        this.attitude =
          this.textParticulars.attitude === (0 || -1) ? false : true;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取评论
    async getComments() {
      try {
        // 调用获取评论的接口
        const res = await getComments({
          type: "a",
          source: this.textId,
        });
        console.log(res);
        this.commentData = res.data.data;
        // 根据结果 存储数据
        this.commentResults = this.commentData.results;
        console.log(this.commentResults);
      } catch (error) {
        console.log(error);
      }
    },
    // 发布按钮 发布文章评论
    async publishCom() {
      try {
        const res = await publishComment({
          target: this.textId,
          content: this.message,
        });
        // 将数据中的事件格式化一下
        let data = res.data.data.new_obj;
        data.pubdate = dayjs(data.pubdate).fromNow();
        // 将请求的结果push到  当前页面的评论数组里面 影响视图
        this.commentResults.unshift(data);
        // 关闭弹框
        this.commentBox = false;
        // 情况评论框的内容
        this.message = "";
        // 提示发布成功
        this.$toast.success("发布评论成功");
      } catch (error) {
        // 关闭弹框
        this.commentBox = false;
        // 提示发布失败
        this.$toast.fail("发布评论失败");
      }
    },
    // 收藏/取消文章点击按钮
    async collection() {
      console.log("点击了");
      try {
        //textParticulars.is_collected 布尔值
        // 如果收藏了文章
        if (this.textParticulars.is_collected) {
          // 取消收藏的API
          const res = await cancelCollection(this.textId);
          console.log(res);
          // 数据影响视图 修改收藏图标为   未被收藏的状态
          this.textParticulars.is_collected = false;
          // 轻提示
          this.$toast("已取消收藏文章");
        }
        // 如果没有收藏文章
        else {
          // 收藏文章的API
          const res = await collectionOfArticles(this.textId);
          console.log(res);
          // 数据影响视图 修改收藏图标为   已被收藏的状态
          this.textParticulars.is_collected = true;
          // 轻提示
          this.$toast("已收藏文章");
        }
      } catch (error) {
        console.log(error);
        this.$toast.fail("操作失败");
      }
    },
    // 点赞/取消(点赞)  文章
    async likeArticle() {
      try {
        if (this.attitude) {
          // 调用取消点赞的接口
          const res = await cancelLick(this.textId);
          console.log(res);
          // 数据影响视图
          this.attitude = false;
          this.$toast("已取消对文章的点赞");
        } else {
          // 发请求 点赞文章
          const res = await likeArticle(this.textId);
          // 数据影响视图
          this.attitude = true;
          // 轻提示
          this.$toast("点赞文章成功");
        }
      } catch (error) {
        console.log(error);
        this.$$toast.fail("系统错误");
      }
    },
    // 对文字作者关注 / 取消关注
    async is_attention() {
      try {
        // 已关注作者的时候
        if (this.textParticulars.is_followed) {
          // 掉取消关注的接口
          const res = await cancelFollowing(this.textParticulars.aut_id);
          console.log(res);
          // 数据影响视图  将文字变为  关注
          this.textParticulars.is_followed = false;
          // 轻提示
          this.$toast.success("已取消关注");
        }
        // 未关注作者的时候
        else {
          //  调关注接口
          const res = await attentionAuthor(this.textParticulars.aut_id);
          console.log(res);
          // 数据影响视图 将文字变为  已关注
          this.textParticulars.is_followed = true;
          // 轻提示
          this.$toast.success("关注成功");
        }
      } catch (error) {
        console.log(error);
        // 轻提示
        this.$toast.fail("系统错误");
      }
    },
    // 对评论 点赞 / 取消
    async lickComment(item, index) {
      console.log(item, index);
      try {
        // 如果处于点赞状态
        if (item.is_liking) {
          // 发送取消点赞接口
          const res = await cancelLickComment(item.com_id);
          // 成功之后 数据影响视图
          this.commentResults[index].is_liking = false;
          // 轻提示
          this.$toast("已取消点赞");
        }
        // 处于未点赞状态
        else {
          // 发送点赞的接口
          const res = await lickComment(item.com_id);
          // 成功之后 数据影响视图
          this.commentResults[index].is_liking = true;
          // 轻提示
          this.$toast("成功点赞");
        }
      } catch (error) {
        console.log(res);
        this.$toast.fail("网络错误");
      }
    },
    // 回复盒子的点击按钮
    replyShowFn(item, value, index) {
      // item/所点击的评论盒子  value/该评论的回复数量  index/
      this.getComments02(item.com_id);
      // 保存信息渲染新的画面
      this.replyitem = item;
      this.reply_count = value;
      this.itemIndex = index;
      // 让盒子处于展示状态
      this.replyShow = true;
    },
    // 获取评论回复
    async getComments02(id) {
      try {
        const res = await getComments({
          type: "c",
          source: id,
        });
        this.replys = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 评论回复中的评论框
    publishComReply() {
      this.replysShow = true;
    },
    // 回复评论弹出层中的   -评论弹出层评论按钮
    async publishCom02() {
      try {
        const res = await publishComment({
          // 评论目标的id
          target: this.replyitem.com_id,
          // 评论内容
          content: this.message02,
          // 文章id
          art_id: this.textId,
        });
        // 格式化时间
        res.data.data.new_obj.pubdate = dayjs(
          res.data.data.new_obj.pubdate
        ).fromNow();
        // 数据影响视图  给数组中unshift 进去新的数据  渲染页面
        this.replys.results.unshift(res.data.data.new_obj);
        this.replyitem.reply_count++;
        this.reply_count++;
        this.message02 = "";
        // 关闭弹框
        this.replysShow = false;
        // 轻提示
        this.$toast.success("回复评论成功");
        // 关闭弹窗
      } catch (error) {
        console.log(error);
        this.$toast.fail("网络错误");
      }
    },
  },
  created() {
    // 获取 页面数据
    this.getNewsDetails();
    // 获取 评论数据
    this.getComments();
  },
};
</script>

<style lang="less" scoped>
// navbar
.nav-bar {
  background-color: #4396f8;
  :deep(.van-ellipsis) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
// 中间文章文章
.main {
  .keywords {
    padding-left: 40px;
  }

  .authorInfo {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;

    .head_portrait {
      flex: 1;
      display: flex;
      align-items: center;

      .myImg {
        margin-left: 30px;
      }
    }

    .authorName {
      flex: 3;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      line-height: 45px;
      padding-left: 20px;

      .authorname {
        font-size: 0.32rem;
      }

      .release_time {
        font-size: 0.30667rem;
        color: #b7b7b7;
      }
    }

    .ttention_button {
      flex: 3;
      display: flex;
      justify-content: flex-end;

      .attention {
        width: 165px;
        height: 56px;
        margin-right: 30px;
      }
    }
  }

  .texts {
    padding: 0.73333rem 0.42667rem;
    -webkit-text-size-adjust: 100%;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 0.21333rem;
    line-height: 1.5;
    word-wrap: break-word;
  }
}
// 评论列表
.comment {
  display: flex;
  width: 10rem;
  height: 240px;
  border-bottom: 0.02667rem solid #ebedf0;

  .userportrait {
    flex: 1;
    margin-top: 20px;
    margin-left: 40px;
  }

  .text {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .comName {
      color: #406599;
      font-size: 0.34667rem;
    }

    .comText {
      font-size: 0.42667rem;
      color: #222;
    }

    .timer {
      font-size: 0.25333rem;
      color: #222;

      .com_reply {
        width: 1.8rem;
        height: 0.64rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        color: #222;
        border-radius: 26.64rem;
        border: 1px solid #ccc;
        text-align: center;
        background-color: #fff;
        margin-left: 30px;
      }
    }
  }

  .icon {
    flex: 1;
    font-size: 0.25333rem;

    .iconfont {
      font-size: 0.25333rem;
    }
    > div {
      margin-top: 30px;
    }
  }
}
// 没有更多了
.noMore {
  width: 100%;
  height: 46px;
  background-color: #fff;
  line-height: 92px;
  font-size: 18px;
  color: #969799;
  font-size: 0.37333rem;
  text-align: center;
}
// 底部footer
.footer {
  width: 100%;
  height: 92px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  border-top: 1px solid #ccc;
  background-color: #fff;

  .writeComment {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .write {
      width: 282px;
      height: 46px;
      border: 0.02667rem solid #eee;
      font-size: 0.4rem;
      text-align: center;
      line-height: 46px;
      border-radius: 26.64rem;
      color: #a7a7a7;
      background-color: #fff;
    }
  }

  .icons {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: rgb(119, 119, 119);

    .iconfont {
      font-size: 0.53333rem;
    }

    .icon-01 {
      font-size: 0.5rem;
      position: relative;

      .comNumber {
        display: block;
        width: 26px;
        height: 26px;
        background-color: red;
        position: absolute;
        border-radius: 50%;
        top: -12px;
        left: 24px;
        text-align: center;
        line-height: 26px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
// 评论弹框
.commentPopups {
  .textarea {
    height: 100%;
    width: 100%;
    padding: 30px 30px;

    :deep(.van-field__value) {
      background-color: #f5f7f9;
      padding: 18px;
    }

    :deep(.van-field__word-limit) {
      margin-top: 40px;
    }
  }

  .publish {
    width: 100px;
    height: 60px;
    background-color: #fff;
    text-align: center;
    line-height: 60px;
    position: relative;
    left: 16px;
    top: 70px;
    color: #6ba3d8;
    border: none;
  }
}

.nomoreShow {
  display: block;
}
// 收藏/文章点赞/评论点赞      样式
.is_collected {
  color: rgb(255, 0, 0) !important;
}

.replySearch {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(237, 235, 235);

  .replySearch_btn {
    width: 400px;
    height: 64px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: black;
    border-radius: 32px;
    font-size: 30px;
    line-height: 64px;
    text-align: center;
  }
}
</style>