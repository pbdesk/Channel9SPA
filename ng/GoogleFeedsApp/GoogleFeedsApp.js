var GoogleFeeds;
(function (GoogleFeeds) {
    'use strict';

    var AppName = 'GoogleFeedApp';
    var GoogleFeedApp = angular.module('GoogleFeedApp', []).factory('GoogleFeedsFactory', ['$q', GoogleFeedsFactory]);

    var GoogleFeedsFactory = (function () {
        function GoogleFeedsFactory($q) {
            this.$qq = $q;
            this.MIXED_FORMAT = 'json_xml';
        }
        GoogleFeedsFactory.prototype.GetFeeds = function (rssUrl, itemCount, feedType) {
            var _this = this;
            var d = this.$qq.defer();

            var feed = new google.feeds.feed(rssUrl);
            feed.setNumEntries(itemCount);
            feed.setResultFormat(this.MIXED_FORMAT);
            feed.includeHistoricalEntries();
            feed.load(function (result) {
                if (!result.error) {
                    if (feedType === 'c9') {
                        _this.ResolveRssMedia(result);
                    }
                    d.resolve(result);
                }
            });
        };

        GoogleFeedsFactory.prototype.ResolveRssMedia = function (result) {
            for (var i in result.feed.entries) {
                jQuery(result.feed.entries[i].xmlNode).find("media\\:thumbnail, thumbnail").each(function () {
                    var current = jQuery(this);
                    if (current.attr("width") == "100")
                        result.feed.entries[i].Thumbnail1 = current.attr("url");
                    if (current.attr("width") == "220")
                        result.feed.entries[i].Thumbnail2 = current.attr("url");
                    if (current.attr("width") == "512")
                        result.feed.entries[i].Thumbnail3 = current.attr("url");
                });

                try  {
                    for (var j in result.feed.entries[i].mediaGroups[0].contents) {
                        var media = result.feed.entries[i].mediaGroups[0].contents[j];
                        switch (media.type) {
                            case "audio/mp3":
                                result.feed.entries[i].mp3 = media.url;
                                break;
                            case "video/webm":
                                result.feed.entries[i].webm = media.url;
                                break;
                            case "video/mp4":
                                if (media.url.indexOf("_high.") > 0)
                                    result.feed.entries[i].mp4high = media.url;
                                else if (media.url.indexOf("_mid.") > 0)
                                    result.feed.entries[i].mp4mid = media.url;
                                else
                                    result.feed.entries[i].mp4reg = media.url;
                                break;
                        }
                    }
                } catch (err) {
                    continue;
                }
                if (typeof (result.feed.entries[i].Thumbnail1) == "undefined")
                    result.feed.entries[i].Thumbnail1 = "";
                if (typeof (result.feed.entries[i].Thumbnail2) == "undefined")
                    result.feed.entries[i].Thumbnail2 = "";
                if (typeof (result.feed.entries[i].Thumbnail3) == "undefined")
                    result.feed.entries[i].Thumbnail3 = "";
                if (typeof (result.feed.entries[i].webm) == "undefined")
                    result.feed.entries[i].webm = "";
                if (typeof (result.feed.entries[i].mp3) == "undefined")
                    result.feed.entries[i].mp3 = "";

                if (typeof (result.feed.entries[i].mp4high) != "undefined")
                    result.feed.entries[i].mp4 = result.feed.entries[i].mp4high;
                else if (typeof (result.feed.entries[i].mp4mid) != "undefined")
                    result.feed.entries[i].mp4 = result.feed.entries[i].mp4mid;
                else if (typeof (result.feed.entries[i].mp4reg) != "undefined")
                    result.feed.entries[i].mp4 = result.feed.entries[i].mp4reg;
                else
                    result.feed.entries[i].mp4 = "";

                result.feed.entries[i].pubDate = result.feed.entries[i].publishedDate.substring(0, 15);
            }
        };
        return GoogleFeedsFactory;
    })();
    GoogleFeeds.GoogleFeedsFactory = GoogleFeedsFactory;
})(GoogleFeeds || (GoogleFeeds = {}));
