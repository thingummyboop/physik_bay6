from manim import *
import numpy as np

class GaltonBrett(Scene):
    def construct(self):
        self.camera.frame_width = 22
        self.camera.frame_height = 22 * 9 / 16
        title = Text("Zufall formt ein Muster (Normalverteilung)").to_edge(UP)
        self.play(Write(title))

        axes = Axes(x_range=[-4, 4, 1], y_range=[0, 10, 2], x_length=8, y_length=4).move_to(DOWN*1.5)
        self.play(Create(axes))

        curve = axes.get_graph(lambda x: 9 * np.exp(-0.5 * x**2), color=YELLOW)
        label = Text("Die Glockenkurve", color=YELLOW, font_size=30).next_to(curve, UP, buff=0.5)

        self.play(Create(curve), run_time=3)
        self.play(Write(label))
        
        info = Text("Fallen tausende Kugeln durch Nägel,\nbilden sie immer dieses Muster!", font_size=28).to_corner(DL)
        self.play(FadeIn(info))
        self.wait(3)