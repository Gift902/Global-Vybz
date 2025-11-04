import { useState, useEffect } from "react";
import api from './lib/axios.js';
import Posts from "./Posts";
import Songs from "./Songs";
import Instrumentals from "./Instrumentals";
import PostCard from "./PostCard";
import SongsCard from "./SongsCard";
import InstrumentalCard from "./InstrumentalCard";

const DashboardContent = ({ section }) => {
  const [showForm, setShowForm] = useState(null);
  const [posts, setPosts] = useState([]);
  const [songs, setSongs] = useState([]);
  const [instrumentals, setInstrumentals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowForm = (formType) => setShowForm(formType);

  // Fetch data depending on selected section
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (section === "posts") {
          const res = await api.get("/posts");
          // Ensure imageUrl is passed
          const updatedPosts = res.data.map((post) => ({
            ...post,
            imageUrl: post.imageUrl || "",
          }));
          setPosts(updatedPosts);
        } else if (section === "songs") {
          const res = await api.get("/songs");
          // Ensure audioUrl is passed
          const updatedSongs = res.data.map((song) => ({
            ...song,
            audioUrl: song.audioUrl || "",
          }));
          setSongs(updatedSongs);
        } else if (section === "instrumentals") {
          const res = await api.get("/instrumentals");
          // Ensure fileUrl is passed
          const updatedInstrumentals = res.data.map((instr) => ({
            ...instr,
            fileUrl: instr.fileUrl || "",
          }));
          setInstrumentals(updatedInstrumentals);
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section]);

  const renderSection = () => {
    switch (section) {
      case "posts":
        return (
          <div className="space-y-6">
            <SingleFormSection
              title="Posts & Events"
              buttonText="Add New Post"
              showForm={showForm}
              handleShowForm={handleShowForm}
              FormComponent={() => (
                <Posts
                  addPost={(newPost) => setPosts((prev) => [newPost, ...prev])}
                />
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    imageUrl={post.imageUrl} // ✅ pass Cloudinary image
                    onDelete={(id) =>
                      setPosts((prevPosts) =>
                        prevPosts.filter((p) => p._id !== id)
                      )
                    }
                    onUpdate={(updatedPost) =>
                      setPosts((prevPosts) =>
                        prevPosts.map((p) =>
                          p._id === updatedPost._id ? updatedPost : p
                        )
                      )
                    }
                  />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  No posts available
                </p>
              )}
            </div>
          </div>
        );

      case "songs":
        return (
          <div className="space-y-6">
            <SingleFormSection
              title="Songs"
              buttonText="Upload New Song"
              showForm={showForm}
              handleShowForm={handleShowForm}
              FormComponent={() => (
                <Songs addSong={(newSong) => setSongs((prev) => [newSong, ...prev])} />
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {songs.length > 0 ? (
                songs.map((song) => (
                  <SongsCard
                    key={song._id}
                    song={song}
                    audioUrl={song.audioUrl} // ✅ pass Cloudinary audio
                    onDelete={(id) =>
                      setSongs((prev) => prev.filter((s) => s._id !== id))
                    }
                    onUpdate={(updatedSong) =>
                      setSongs((prev) =>
                        prev.map((s) =>
                          s._id === updatedSong._id ? updatedSong : s
                        )
                      )
                    }
                  />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  No songs available
                </p>
              )}
            </div>
          </div>
        );

      case "instrumentals":
        return (
          <div className="space-y-6">
            <SingleFormSection
              title="Instrumentals"
              buttonText="Upload New Beat"
              showForm={showForm}
              handleShowForm={handleShowForm}
              FormComponent={() => (
                <Instrumentals
                  addInstrumental={(newInstr) =>
                    setInstrumentals((prev) => [newInstr, ...prev])
                  }
                />
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {instrumentals.length > 0 ? (
                instrumentals.map((instr) => (
                  <InstrumentalCard
                    key={instr._id}
                    instrumental={instr}
                    fileUrl={instr.fileUrl} // ✅ pass Cloudinary file
                    onDelete={(id) =>
                      setInstrumentals((prev) =>
                        prev.filter((item) => item._id !== id)
                      )
                    }
                    onUpdate={(updatedInstr) =>
                      setInstrumentals((prev) =>
                        prev.map((item) =>
                          item._id === updatedInstr._id ? updatedInstr : item
                        )
                      )
                    }
                  />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  No instrumentals available
                </p>
              )}
            </div>
          </div>
        );

      default:
        return <p className="text-gray-400">Select a section from the sidebar.</p>;
    }
  };

  return (
    <main className="mt-6">
      <div className="bg-gray-900/70 border border-gray-800 p-6 rounded-2xl backdrop-blur-md shadow-lg">
        {renderSection()}
      </div>
    </main>
  );
};

export default DashboardContent;

/* ---------------------- SINGLE FORM SECTION ---------------------- */
const SingleFormSection = ({
  title,
  buttonText,
  showForm,
  handleShowForm,
  FormComponent,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    handleShowForm(title.toLowerCase());
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-semibold text-gray-100">{title}</h2>
      <p className="text-gray-400">
        Manage and upload your {title.toLowerCase()} here.
      </p>

      <button
        onClick={toggleForm}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-all shadow-md hover:shadow-blue-500/20"
      >
        {buttonText}
      </button>

      {isFormVisible && (
        <div className="mt-6">
          <FormComponent />
        </div>
      )}
    </div>
  );
};
