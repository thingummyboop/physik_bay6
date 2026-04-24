from manim import *
import random

class WaermelehreTeilchen(Scene):
    def construct(self):
        self.camera.frame_width = 26
        self.camera.frame_height = 26 * 9 / 16
        title = Text("Temperatur = Teilchenbewegung").to_edge(UP)
        self.play(Write(title))

        box_cold = Rectangle(width=4, height=4, color=BLUE).shift(LEFT*4)
        box_hot = Rectangle(width=4, height=4, color=RED).shift(RIGHT*4)

        cold_text = Text("Kalt (Wenig Bewegung)", color=BLUE, font_size=28).next_to(box_cold, UP, buff=0.5)
        hot_text = Text("Heiß (Viel Bewegung)", color=RED, font_size=28).next_to(box_hot, UP, buff=0.5)

        self.play(Create(box_cold), Create(box_hot), Write(cold_text), Write(hot_text))

        cold_dots = VGroup(*[Dot(color=BLUE, radius=0.15).move_to(LEFT*4 + RIGHT*random.uniform(-1.5,1.5) + UP*random.uniform(-1.5,1.5)) for _ in range(40)])
        hot_dots = VGroup(*[Dot(color=RED, radius=0.15).move_to(RIGHT*4 + RIGHT*random.uniform(-1.5,1.5) + UP*random.uniform(-1.5,1.5)) for _ in range(40)])

        self.play(FadeIn(cold_dots), FadeIn(hot_dots))

        def update_cold(mobs, dt):
            for dot in mobs:
                dot.shift((RIGHT*random.uniform(-0.5,0.5) + UP*random.uniform(-0.5,0.5)) * dt)

        def update_hot(mobs, dt):
            for dot in mobs:
                dot.shift((RIGHT*random.uniform(-12,12) + UP*random.uniform(-12,12)) * dt)

        cold_dots.add_updater(update_cold)
        hot_dots.add_updater(update_hot)

        self.wait(5)
        cold_dots.clear_updaters()
        hot_dots.clear_updaters()
        
        info = Text("Mehr Wärme = Mehr Platzbedarf (Ausdehnung)", color=YELLOW, font_size=32).move_to(DOWN*4)
        self.play(Write(info))
        self.wait(2)